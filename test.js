var extend = require('util-extend');
var test = require('tape');
var Collection = require('./index');

var Model = function (args) {
  extend(this, args);
};

test('basics', function (t) {
  var c = new Collection(Model);

  t.equal(c.count(), 0);
  c.add(new Model({ name: 'ben' }));
  t.equal(c.count(), 1);
  t.ok(c.first() instanceof Model);
  t.end();
});

test('input', function (t) {
  var c1 = new Collection(Model);
  var c2 = new Collection(Model, c1);

  t.equal(c1.count(), 0);
  t.equal(c2.count(), 0);
  c1.add(new Model({ name: 'bozo' }));

  t.equal(c1.count(), 1);
  t.equal(c2.count(), 1);
  t.ok(c1.first() instanceof Model);
  t.ok(c2.first() instanceof Model);
  t.equal(c2.first().name, 'bozo');

  t.end();
});

test('filtering', function (t) {
  var c1 = new Collection(Model);
  var c2 = new Collection(Model, c1, function (model) {
    return model.name.match(/^b/);
  });

  c1.add(new Model({ name: 'bozo' }));
  c1.add(new Model({ name: 'ben' }));
  c1.add(new Model({ name: 'dave' }));

  t.equal(c1.count(), 3);
  t.equal(c2.count(), 2);

  t.end();
});
