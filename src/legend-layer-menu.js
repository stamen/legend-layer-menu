(function() {
  "use strict";

  function LegendLayerMenu(rootSelector) {

    //
    // Constants
    //
    var that              = this,
        rootNode          = document.querySelector(rootSelector), //"#legend-layer-menu",
        layerGroups       = {},
        layers            = {},
        sortIcon          = [
              "<svg version=1.1 id=Your_Icon xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px viewBox=\"-568.5 362.1 61.6 46.3\" enable-background=\"new -568.5 362.1 61.6 46.3\" xml:space=preserve class=\"grab\"><g><path d=\"M-507.3,370.4l-7.7-7.9c0,0,0,0,0,0c-0.1-0.1-0.3-0.3-0.5-0.4c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-0.2,0-0.3-0.1-0.5-0.1",
              "c0,0,0,0,0,0c0,0,0,0,0,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0c-0.2,0.1-0.4,0.2-0.6,0.4l-7.7,7.9c-0.6,0.7-0.6,1.7,0,2.3",
              "c0.3,0.3,0.7,0.5,1.2,0.5c0.4,0,0.9-0.2,1.3-0.5l4.9-5v29.1c0,0.9,0.6,1.7,1.5,1.7c0.9,0,1.5-0.7,1.5-1.7v-29l4.9,4.9",
              "c0.3,0.3,0.8,0.5,1.2,0.5c0.4,0,0.9-0.2,1.2-0.5C-506.7,372.1-506.7,371.1-507.3,370.4z\"/>",
              "<title>Sorting control</title>",
              "<path d=\"M-552.8,397.7l-4.9,4.9v-29c0-0.9-0.6-1.7-1.5-1.7s-1.5,0.7-1.5,1.7v29.1l-4.9-5c-0.6-0.7-1.7-0.7-2.4,0",
              "c-0.7,0.6-0.7,1.7-0.1,2.3l7.6,7.9c0.3,0.3,0.7,0.5,1.2,0.5c0,0,0,0,0,0c0,0,0,0,0,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.2,0.5-0.4",
              "c0,0,0,0,0,0l7.7-7.9c0.6-0.7,0.6-1.7-0.1-2.3C-551.1,397.1-552.2,397.1-552.8,397.7z\"/><path d=\"M-524.5,383.2h-26.5c-0.9,0-1.7,0.9-1.7,1.9c0,0.9,0.7,1.9,1.7,1.9h26.5c0.9,0,1.7-0.9,1.7-1.9",
              "C-522.8,384.2-523.5,383.2-524.5,383.2z\"/><path d=\"M-524.5,375.8h-26.5c-0.9,0-1.7,0.9-1.7,1.9c0,0.9,0.7,1.9,1.7,1.9h26.5c0.9,0,1.7-0.9,1.7-1.9",
              "C-522.8,376.8-523.5,375.8-524.5,375.8z\"/><path d=\"M-524.5,390.6h-26.5c-0.9,0-1.7,0.9-1.7,1.9c0,0.9,0.7,1.9,1.7,1.9h26.5c0.9,0,1.7-0.9,1.7-1.9",
              "C-522.8,391.6-523.5,390.6-524.5,390.6z\"/></g></svg>"
            ].join(""),
        layerTemplate     = "<li class=\"draggable drag-drop layer-item-{id}\" data-id=\"{id}\"> " + sortIcon + "<span class=\"label\">{label}</span></li>",
        inputFormTemplate = "<div class=\"input-form hidden\"><form class=\"input-form-element\" name=\"{layerid}-input-form\"><input type=\"text\" name=\"uri\" placeholder=\"EcoEnginwel API URI\" value=\"https://dev-ecoengine.berkeley.edu/api/observations/?format=geojson&selected_facets=family_exact%3A%22cricetidae%22&q=&min_date=1960&max_date=1965&page_size=100\"><input type=\"text\" name=\"label\" placeholder=\"A name for this layer\"><button>Add</button></form></div>",
        i, dragConfig, oldParent, dropConfig, orderCache;

    //
    // Add a default class name
    //
    rootNode.classList.add("legend-layer-menu");

    dragConfig = {

      onstart: function(event) {

        var oTop    = event.target.offsetTop,
            oLeft   = event.target.offsetLeft,
            oParent = event.target.parentNode;

        oldParent = oParent;

        rootNode.appendChild(event.target);

        event.target.setAttribute("data-x", (event.clientX-event.target.offsetLeft+10)-(event.clientX-oLeft));
        event.target.setAttribute("data-y", (event.clientY-event.target.offsetTop+25)-(event.clientY-oTop));

        /*
        event.target.style.webkitTransform =
        event.target.style.transform =
        "translate(" + (event.pageX-event.target.offsetLeft) + "px, " + (event.pageY-event.target.offsetTop) + "px)";
        */

        event.target.classList.add("dragging");
      },

      // call this function on every dragmove event
      onmove: function (event) {

        var layerNode = event.dropzone ? event.dropzone.element() : null;

        var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
        y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy,

        isListItem = event.dropzone ? layerNode.classList.contains("draggable") : null,
        dropZone   = layerNode;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
        "translate(" + x + "px, " + y + "px)";

        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);

        if (isListItem > -1) {
          if (dropZone && dropZone.parentNode) {
            var dragPosState = [[event.pageX, event.pageY], [(dropZone.offsetLeft+dropZone.parentNode.offsetLeft+dropZone.offsetWidth)/2, (dropZone.offsetTop+dropZone.parentNode.offsetTop+dropZone.offsetHeight)/2]];

            if (dragPosState[0][1] < dragPosState[1][1]) {
              dropZone.setAttribute("data-drop-direction","top");
            } else {
              dropZone.setAttribute("data-drop-direction","bottom");
            }
          }
        }
      },
      // call this function on every dragend event
      onend: function (event) {

        event.target.style["-webkit-transform"] = "translate(0,0)";
        event.target.style.transform = "translate(0,0)";
        event.target.parentNode.classList.remove("dragging");

        if (event.target.parentNode.classList.contains("legend-layer-menu")) {
          oldParent.appendChild(event.target);
        }

        //
        // This layer might be in a new list
        //
        event.target.setAttribute("data-list",event.target.parentNode.getAttribute("data-layername"))

        event.target.classList.remove("dragging");

        triggerOrderChange();

        oldParent = null;
      }
    };

    dropConfig = {
      // only accept elements matching this CSS selector
      accept: ".drag-drop",
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.1,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add("drop-active");
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add("drop-target");
        draggableElement.classList.add("can-drop");
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove("drop-target");
        event.relatedTarget.classList.remove("can-drop");
        clearMargins();
      },
      ondrop: function dropEvent(event) {
        if (event.target.classList.contains("draggable") || event.target.classList.contains("draggable-2")) {

          if (event.target.getAttribute("data-drop-direction") === "top") {
            event.target.parentNode.insertBefore(event.relatedTarget, event.target);
          } else {
            if (event.target.nextSibling) {
              event.target.parentNode.insertBefore(event.relatedTarget, event.target.nextSibling);
            } else {
              event.target.parentNode.appendChild(event.relatedTarget);
            }
          }

        } else {
          event.target.appendChild(event.relatedTarget);
        }
        clearMargins();
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove("drop-active");
        event.target.classList.remove("drop-target");
      },
      ondropmove: function(event) {

      }
    };

    function triggerOrderChange() {
      var order = getLayerOrder();

      if (order !== orderCache) {

        order = order.reverse().map(function(interactObject) {

          //
          // Convert output from interact objects to
          // user friendly layer objects, unless it is already one
          //

          if (!interactObject.list) {
            return {
              "id"    : interactObject.element().getAttribute("data-id"),
              "list"  : interactObject.element().getAttribute("data-list"),
              "label" : interactObject.element().getAttribute("data-label"),
              "uri"   : interactObject.element().getAttribute("data-uri")
            }
          } else {
            return interactObject;
          }
        });

        that.fire("orderChanged", {
          "order" : order
        });
        orderCache = order;
      }
    }

    function getLayerOrder() {
      var layerNodes   = rootNode.querySelectorAll(".draggable"),
          rasterLayers = rootNode.querySelectorAll("select"),
          order        = [];

      for (var i=0; layerNodes.length > i; i++) {
        order.push( layers[ layerNodes[i].getAttribute("data-id") ] );
      }

      for (var i=0; rasterLayers.length > i; i++) {
        if (rasterLayers[i].value.length) {
          order.push({
            "list" : "raster",
            "uri"  : rasterLayers[i].value
          });
        }
      }

      return order;
    }

    function clearMargins() {
      var dropzones = document.querySelectorAll(".dropzone");

      for (var i=0; dropzones.length > i; i++) {
        for (var ii=0; dropzones[i].children.length > ii; ii++) {
          dropzones[i].children[ii].setAttribute("data-drop-direction",null);
        }
      }
    }

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {func.apply(context, args);}
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {func.apply(context, args);}
      };
    }

    //
    // Create a unique id for layers
    // lifted from http://stackoverflow.com/a/8809472
    //
    function getUniqueId () {
        var d = new Date().getTime(),
            newId, r;

        newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

        return newId;
    }

    function append(rootNode, html) {
      var div = document.createElement("div");
      div.innerHTML = html;
      while (div.children.length > 0) {
        rootNode.appendChild(div.children[0]);
      }

      return rootNode;
    }

    function parentHasClass(startingElement, className, depth) {

      var last  = startingElement;

      for (var i=0; (depth||10) > i && last; i++) {

        if (last && last.className && last.className.indexOf(className) > -1) {
          return last;
        }

        last = last.parentNode;

      }

      return null;
    }

    function processTemplate(template, data) {

        Object.keys(data).forEach(function(key) {

          template = template.split("{" + key + "}").join(data[key]);

        });

        return template;

    }

    function promptUserForLayerData(buttonNode, callback) {

      var inputFormNode = buttonNode.parentNode.querySelector(".input-form");

      //
      // Rise above!
      //
      buttonNode.parentNode.style.zIndex = 1;

      //
      // Add input form for this menu group if it
      // does not already exist
      //
      if (!inputFormNode) {
        append(buttonNode.parentNode, processTemplate(inputFormTemplate, {
          "layerid" : buttonNode.getAttribute("data-for")
        }));
        inputFormNode = buttonNode.parentNode.querySelector(".input-form");

        inputFormNode.querySelector("button").addEventListener("click", function(e) {

          e.preventDefault();

          e.target.parentNode.parentNode.classList.add("hidden");

          //
          // Sit back down
          //
          buttonNode.parentNode.style.zIndex = "inherit";

          if (typeof callback === "function") {
            callback();
          }

        }, false);
      }

      //
      // Show the form
      //
      inputFormNode.classList.remove("hidden");
    }

    function getLayerNode(layer) {

      //Allow lookup by layer object or layer id
      var id = (typeof layer === "object") ? layer.id : layer;

      return layers[id].element();

    }

    function getLayerGroupNode(groupId) {

      return layerGroups[groupId].element();

    }

    function createLayer (layerNode) {
      layers[layerNode.getAttribute("data-id")] = interact(layerNode).draggable(dragConfig).dropzone(dropConfig);

      that.fire("layerAdded", {
        "list"  : layerNode.getAttribute("data-list"),
        "label" : layerNode.getAttribute("data-label"),
        "uri"   : layerNode.getAttribute("data-uri"),
        "id"    : layerNode.getAttribute("data-id")
      });
    }

    function onClickLayerAddAction (e) {
      promptUserForLayerData(e.target, function() {
        var formNode     = e.target.parentNode.querySelector("form"),
            layerId      = getUniqueId(),
            layerGroupId = e.target.getAttribute("data-for"),
            layerNode;

        //
        // Append new layer item in menu
        //
        append(
          getLayerGroupNode(e.target.getAttribute("data-for")),
          processTemplate(layerTemplate, {
            "label" : formNode.label.value,
            "id"    : layerId
          })
        );

        layerNode = rootNode.querySelector(".layer-item-" + layerId);
        layerNode.setAttribute("data-list",  layerGroupId);
        layerNode.setAttribute("data-label", formNode.label.value);
        layerNode.setAttribute("data-uri",   formNode.uri.value);

        //
        // Register new layer
        //
        createLayer(layerNode, layerGroupId);

      });
    }

    function init() {

      var layerGroupNodes = rootNode.querySelectorAll("ul"),
          actionNodes     = document.querySelectorAll("h2 button"),
          rasterLayers    = rootNode.querySelectorAll("select"),
          layerName;

      //
      // Iterate through unordered list elements in the root
      // container and use them to create Interact drop zones
      // and then add them to the groups
      //
      for (i=0; layerGroupNodes.length > i; i++) {

        //Get layername from markup
        layerName = layerGroupNodes[i].getAttribute("data-layername");

        //Add a class to drop zone for styleing
        layerGroupNodes[i].classList.add("dropzone");

        //Bind Interact to drop zone
        layerGroups[layerName] = interact(layerGroupNodes[i]).dropzone(dropConfig);

      }

      //
      // Handle click events
      //
      rootNode.addEventListener("click", function(e) {

        if (e.target.tagName === "BUTTON") {
          onClickLayerAddAction.apply(this, arguments);
        }

      }, false);

      //
      // Add change listeners to raster layers
      //
      for (var i=0; rasterLayers.length > i; i++) {
        rasterLayers[i].addEventListener("change", function(e) {
          triggerOrderChange();
        });
      }
    }

    //
    // Public interface
    //
    that.getLayerNode  = getLayerNode;
    that.getLayerOrder = getLayerOrder;
    that.rootNode      = rootNode;

    //
    // Here we go
    //

    init();

    return that;

  }

  //
  // Make available to STMN namespace
  //
  if (typeof window.STMN !== "object") {
    window.STMN = {};
  }

  window.STMN.LegendLayerMenu = STPX.samesies.extend(LegendLayerMenu);

  //
  // Make available to CommonJS
  //
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = STMN.LegendLayerMenu;

  // Make available to AMD module
  } else if (typeof define === "function" && define.amd) {
    define(STMN.LegendLayerMenu);
  }
}());
