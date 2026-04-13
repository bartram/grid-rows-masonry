import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type StorybookEntry = {
  id: string;
  name: string;
  title: string;
  type: string;
  tags?: string[];
};

type StorybookIndex = {
  entries: Record<string, StorybookEntry>;
};

const storybookIndexPath = resolve(process.cwd(), "storybook-static/index.json");
const storybookIndex = JSON.parse(
  readFileSync(storybookIndexPath, "utf8"),
) as StorybookIndex;

const stories = Object.values(storybookIndex.entries)
  .filter((entry) => entry.type === "story" && entry.tags?.includes("test"))
  .sort(
    (left, right) =>
      left.title.localeCompare(right.title) ||
      left.name.localeCompare(right.name),
  );

async function waitForStory(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.locator("#storybook-root").waitFor();
  await page.waitForFunction(() => {
    const root = document.querySelector("#storybook-root");
    return root instanceof HTMLElement && root.childElementCount > 0;
  });
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }
  });
  await page.waitForTimeout(250);
}

test.describe("Storybook visual snapshots", () => {
  for (const story of stories) {
    test(`${story.title} / ${story.name}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
      await waitForStory(page);

      await expect(page.locator("#storybook-root")).toHaveScreenshot(
        `${story.id}.png`,
        {
          animations: "disabled",
          caret: "hide",
          scale: "css",
        },
      );
    });
  }
});
