var Stream = require('stream');
var util = require('util');
var split = require('split');

// function LocalStorageStream (localStorage) {
//   var self = this;

//   stream.Stream.call(this)

//   Object.keys(localStorage).forEach(function () {
//     self.
//   });
// }

// util.inherits(LocalStorageStream, stream.Stream)

function Collection (Model, input, filter) {
  var self = this;
  var list = [];

  Stream.call(this);
  this.readable = true;

  if (input) {
    input.pipe(split(JSON.parse)).on('data', function (json) {
      var m = new Model(json);

      if (!filter || (filter(m))) {
        list.push(m);
      }
    });
  }

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
