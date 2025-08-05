# vue-todo

A simple Todo application built with Vue.js.

## Features

- Add, edit, and delete todo items
- Mark tasks as complete or incomplete
- Clean and intuitive user interface
- Responsive design for desktop and mobile
- Persist todos in local storage

## Project Structure

The repository is organized as follows:

- `src/` – Source code for the Vue.js application
  - `components/` – Vue components for the todo list, input form
  - `App.vue` – Main application component
  - `main.ts` – Application entry point
- `public/` – Static assets and the main HTML file
- `package.json` – Project metadata and dependencies

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thaboRach/vue-todo.git
   cd vue-todo
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. Start the JSON server

   ```bash
   pnpm run server
   ```

   (Ensure you have [json-server](https://github.com/typicode/json-server) installed globally or as a dev dependency.)

## Usage

Once running locally, access the app at `http://localhost:5173` (or the port shown in your terminal).

## Contributing

Contributions are welcome! Please open issues or submit pull requests for any improvements or bug fixes.

## License

This project is open source.
