# TinyTable

TinyTable helps teachers of kids ages 2 to 10 plan an activity around a theme, age group, group size, and supplies on hand. It includes a built-in activity library, an optional AI-created activity, saved activity cards, and print-friendly cards.

## DeepSpace features

- DeepSpace sign-in lets a teacher sync a personal workspace.
- DeepSpace real-time records store the teacher's saved cards, selected supplies, and planning preferences.
- The OpenAI chat-completion integration creates a custom activity. It is available to signed-in users and limited to three requests per browser session; the app owner pays for those requests.

Built-in activities and browser printing remain available if the custom generation integration is unavailable. The app does not collect information about children.

## Run locally

```sh
npm install
git init
npx deepspace auth login
npx deepspace app init
git add -A
git commit -m "Build TinyTable"
npx deepspace dev start
```

Deploy with `npx deepspace deploy` after committing the finished changes.
