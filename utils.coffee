# Usage:
#
# Provides a few utility functions.

define {
    extend: (obj, mixin) ->
        for name, method of mixin
            obj[name] = method

    include: (klass, mixin) -> @extend klass::, mixin

    namespace: (target, name, block) ->
      [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
      top = target
      target = target[item] or= {} for item in name.split '.'
      block target, top
}
