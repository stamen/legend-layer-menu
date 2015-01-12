# samesies
Adds common interface elements on existing constructors and objects. This interface includes an event facade as well as data setters and getters.

Methods
---------
   * **mix:** Adds interface items to an existing object
   * **extend:** Adds interface items to a constructor

Interface Methods
-----------------
   * **on:** Subscribe to an event by name
   * **once:** Same as `on` but unsubscribes after the first fire
   * **fire:** Fires an event by name
   * **set:** Set data by name
   * **get:** Get data by name
