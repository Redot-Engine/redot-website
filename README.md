# ![Redot Experimental Docs Cover](/.github/assets/cover.png)

![Issues](https://img.shields.io/github/issues-raw/Redot-Engine/redot-website?color=FFA726&label=issues&style=for-the-badge)
![Pull Requests](https://img.shields.io/github/issues-pr-raw/Redot-Engine/redot-website?color=FFA726&label=PRs&style=for-the-badge)
![Contributors](https://img.shields.io/github/contributors/Redot-Engine/redot-website?color=FFA726&label=contributors&style=for-the-badge)
![Lines](https://img.shields.io/endpoint?url=https://ghloc.vercel.app/api/Redot-Engine/redot-website/badge?style=flat&logoColor=white&color=FFA726&style=for-the-badge)
![Commit Activity](https://img.shields.io/github/commit-activity/m/Redot-Engine/redot-website?color=FFA726&label=commits&style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/Redot-Engine/redot-website?color=FFA726&label=last%20commit&style=for-the-badge)

<div align="center">

<h1 align="center">Redot Engine Website</h1>

This is the official website for the **Redot Engine**, providing information, resources, and updates about the engine.

</div>

## Build from source

Bun, Node.js, Deno and others can be used, but we are using Bun.

### Install Bun

Bun is a fast JavaScript runtime like Node.js, but with a built-in package manager. If you haven't installed it yet, you can do so by running:

```bash
curl -fsSL https://bun.sh/install | bash
```

Follow the instructions to complete the installation. After installation, ensure Bun is available by running:

```bash
bun --version
```

### Install Node Dependencies

Go to the project directory and install the Node dependencies using Bun:

```bash
cd redot-website
bun install
```

### Read CONTRIBUTING.md and Setting up .env for development

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before you start your contribution development.

## Running

Once everything is set up, you can run the following command to start the Next.js development server:

```bash
bun dev
```

## Build for Production

Build the Next.js application for production using the following command:

```bash
bun build
```

## Hardware Requirement

Unfortunately this project does not work with old hardwares. We recommend to use recent hardware.

## Contributors

<a href="https://github.com/Redot-Engine/redot-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Redot-Engine/redot-website" />
</a>

## License

The Redot Engine Website is licensed under the [MIT License](LICENSE).
