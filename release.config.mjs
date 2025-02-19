export default {
  branches: ["main"], // Defines the branches to trigger releases
  plugins: [
    "@semantic-release/commit-analyzer", // Analyze commit messages
    "@semantic-release/release-notes-generator", // Generate release notes
    "@semantic-release/changelog", // Update changelog
    "@semantic-release/npm", // Publish to npm
    "@semantic-release/github", // Create GitHub releases
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"], // Push changes back to the repo
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
