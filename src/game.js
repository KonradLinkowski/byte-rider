const $ = require('./jquery');
const Table = require('./table');
const Renderer = require('./renderer');
const Engine = require('./engine');

const Game = {};

let table;
let input = [];
let picked;

const onBoard = (_, event) => {
  if (event.target && event.target.matches('.help')) {
    event.stopPropagation();
    return;
  }

  if (event.target && (event.target.matches('.card'))) {
    $(event.target).addClass('picked');
  }
};

const offBoard = (_, event) => {
  if (event.target && event.target.matches('.help')) {
    event.stopPropagation();
    $(event.target).toggleClass('picked');
    return;
  }

  if (event.target && (event.target.matches('.card') || event.target.matches('.pile')) && event.target.id) {
    event.stopPropagation();
    input.push(event.target.id);
    [table, picked] = Engine.tick(table, 'x', ...input);
    input = picked ? [picked] : [];
    Renderer.invalidate(table, picked);
  }
};

Game.reset = () => {
  table = Table.create();
  table = Table.deal(table, 'x');
  input = [];
  picked = undefined;
  Renderer.invalidate(table, picked);
};

Game.play = () => {
  $('#board').click(onBoard, offBoard);

  Game.reset();
};

module.exports = Game;
