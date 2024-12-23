# Kowalski (Node.js Telegram Bot)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
![GitHub License](https://img.shields.io/github/license/ABOCN/TelegramBot)

Kowalski is a a simple Telegram bot made in Node.js.
 - You can find Kowalski at [@KowalskiNodeBot](https://t.me/KowalskiNodeBot) on Telegram.

## Requirements
 - A Telegram bot (create one at [@BotFather](https://t.me/botfather))
 - Node.js 20 LTS (or above)
 - Python 3 (or above, for use with SpamWatch API)
 - Python dependencies: use ``pip install -r requirements.txt``
 - Node.js dependencies: use ``npm install .``
 - FFmpeg

## Run it yourself, develop or contribute with Kowalski
First, clone the repo with Git:
```
git clone https://github.com/ABOCN/TelegramBot kowalski
```
And now, init the submodules with these commands (this is very important):
```
cd kowalski
git submodule update --init --recursive
```
Next, inside the repository directory, create a `config.env` file with some content, which you can see the [example .env file](config.env.example) to fill info with. To see the meaning of each one, see [the Functions section](#configenv-functions).

After editing the file, save all changes and run the bot with ``npm start``.
- To deal with dependencies, just run ``npm install`` or ``npm i`` at any moment to install all of them.

## config.env Functions
- **botToken**: Put your bot token that you created at [@BotFather](https://t.me/botfather), as the example above.
- **botAdmins**: Put the ID of the people responsible for managing the bot (as the example above). They can use some administrative + exclusive commands on any group.
- **lastKey**: Last.fm API key, for use on `lastfm.js` functions, like see who is listening to what song and etc.
- **weatherKey**: Weather.com API key, used for the `/weather` command.

## Note
- Take care of your ``config.env`` file, as it is so much important and needs to be secret (like your passwords), as anyone can do whatever they want to the bot with this token!

## About/License
BSD-3-Clause - 2024 Lucas Gabriel (lucmsilva).
