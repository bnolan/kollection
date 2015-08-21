var Stream = require('stream');
var util = require('util');
var split = require('split');

function Collection (Model, input, filter) {
  var self = this;
  var list = [];

  Stream.call(this);
  this.readable = true;

  if (input) {
    ((input instanceof Collection && !input.empty()) ? input.rewind() : input).pipe(split(JSON.parse)).on('data', function (json) {
      var m = new Model(json);

      if (!filter || (filter(m))) {
        list.push(m);
        self.emit('add', m);
      }
    });
  }

  this.rewind = function () {
    var result = new Stream();

    self.on('data', function (data) {
      result.emit('data', data);
    });

    setTimeout(function () {
      list.forEach(function (element) {
        result.emit('data', JSON.stringify(element) + '\n');
      });
    }, 0);

    return result;
  };

  this.empty = function () {
    return list.length === 0;
  };

  this.add = function (element) {
    list.push(element);
    self.emit('data', JSON.stringify(element) + '\n');
  };

  this.first = function () {
    return list[0];
  };

  this.all = function () {
    return list;
  };

  this.count = function () {
    return list.length;
  };
}

util.inherits(Collection, Stream);

module.exports = Collection;
