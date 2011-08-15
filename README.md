Backbone-Common
===============
Backbone-Common is a growing collection of common Backbone subclasses and
utilities useful across projects to work with the RequireJS module format.
Read the [CommonJS notes](http://requirejs.org/docs/commonjs.html) on the
[RequireJS website](http://requirejs.org).

If you have useful subclasses or utilities of your own, please send a pull
request.

A Few Notes
-----------
* All of the modules must be written in CoffeeScript. This is mostly preference,
but also to ensure consistent compiled JavaScript.
* Each module must have a comment block at the top explaining the usage of
the module including explaining any properties or methods that can be overriden
to customize the behavior, if appropriate.
* Modules should encapuslate classes/utilities that have a high chance of being
used together. This includes Model/Collection pairs, View/CollectionView pairs,
etc. See https://github.com/bruth/backbone-common/blob/master/models/polling.coffee
for an example of a model and collection that implements polling functionality.
