(function() {
  "use strict";

  function LegendLayerMenu(rootSelector, options) {

    options = options || {};

    //
    // Constants
    //
    var that              = this,
        rootNode          = document.querySelector(rootSelector), //"#legend-layer-menu",
        layerGroups       = {},
        layers            = {},
        colors            = ["#2166ac","#b2182b","#f4a582","#4393c3","#67001f","#d1e5f0","#fddbc7","#f7f7f7","#d6604d","#92c5de","#053061"],
        secondaryColors   = [
          "#2166ac","#b2182b","#f4a582","#4393c3","#67001f","#d1e5f0","#fddbc7","#f7f7f7","#d6604d","#92c5de","#053061","#8dd3c7","#ffffb3",
          "#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f",
          "#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3",
          "#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999",
          "#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc",
          "#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2",
          "#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928",
          "#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666",
          "#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666",
          "#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837",
          "#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2",
          "#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695",
          "#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a",
          "#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061",
          "#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419",
          "#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b",
          "#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30",
          "#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b",
          "#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000",
          "#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d",
          "#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704",
          "#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b",
          "#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b",
          "#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d",
          "#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506",
          "#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"
        ],
        defaultColor      = options.color || "#000",
        layerLimit        = options.layerLimit || colors.length,
        sortIcon          = [
              "<svg version=1.1 class=\"drag-icon\" xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px viewBox=\"-568.5 362.1 61.6 46.3\" enable-background=\"new -568.5 362.1 61.6 46.3\" xml:space=preserve class=\"grab\"><g><path d=\"M-507.3,370.4l-7.7-7.9c0,0,0,0,0,0c-0.1-0.1-0.3-0.3-0.5-0.4c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-0.2,0-0.3-0.1-0.5-0.1",
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
        deleteIcon        = [
              "<svg class=\"delete-icon\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"",
              "viewBox=\"18.3 -2.1 93.6 92.3\" enable-background=\"new 18.3 -2.1 93.6 92.3\" xml:space=\"preserve\">",
              "<path d=\"M27.9-2.1l-8.4,8.4l4.2,4.2l33.6,33.6L23.7,77.7l-4.2,4.2l8.4,8.4l4.2-4.2l33.6-33.6l33.6,33.6l4.2,4.2l8.4-8.4l-4.2-4.2",
              "L74,44.1l33.6-33.6l4.2-4.2l-8.4-8.4l-4.2,4.2L65.7,35.7L32.1,2.1C32.1,2.1,27.9-2.1,27.9-2.1z\"/>",
              "</svg>"
        ].join(""),
        editIcon        = "<span class=\"edit-icon\">[edit]</span>",
        layerTemplate       = "<li class=\"draggable drag-drop layer-item-{id}\" data-id=\"{id}\" data-color=\"{color}\" data-list=\"{list}\" data-label=\"{label}\" data-uri=\"{uri}\"> " + sortIcon + "<input type=\"color\" class=\"color-picker\" value=\"{color}\"><span class=\"label\">{label}</span> " + deleteIcon + editIcon + " </li>",
        inputFormTemplate   = "<div class=\"input-form hidden\"><form class=\"input-form-element\" name=\"{layerid}-input-form\"><input type=\"text\" name=\"uri\" placeholder=\"EcoEnginwel API URI\" value=\"https://dev-ecoengine.berkeley.edu/api/observations/?format=geojson&selected_facets=family_exact%3A%22cricetidae%22&q=&min_date=1960&max_date=1965&page_size=100\"><input type=\"text\" name=\"label\" placeholder=\"A name for this layer\"><button>Add</button></form></div>",
        colorPickerTemplate = "<div class=\"color-picker-panel\" style=\"display:none;position:absolute;\">" + colors.map(function(c) {return "<div class=\"color\" style=\"background-color:"+c+";\"></div>"}).join("") + "</div>",
        i, dragConfig, oldParent, dropConfig, orderCache, inputFormNode;

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

        //TODO: Stop hard coding the offset
        event.target.setAttribute("data-x", (event.clientX-event.target.offsetLeft+10)-(event.clientX-oLeft));
        event.target.setAttribute("data-y", (event.clientY-event.target.offsetTop+60)-(event.clientY-oTop));

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

    //
    // Finds a color from the colors array which is not
    // already being used. If they are all being used, it
    // returns the default color
    //
    function getNewColor() {

      var usedColors = [],
          element;

      for (var i in layers) {
        if ( layers.hasOwnProperty(i) ) {

          element = layers[i].element();

          if (element && element.getAttribute("data-color")) {
            usedColors.push(element.getAttribute("data-color"));
          }

        }
      }

      for (var i=0; colors.length > i; i++) {
        if ( usedColors.indexOf( colors[ i ] ) < 0 ) {
          return colors[i];
        }
      }

      return defaultColor;

    }
    window.getNewColor = getNewColor;

    //
    // Emits the orderChanged event
    //
    function triggerOrderChange() {
      var order = getLayerOrder();

      if (order !== orderCache) {

        order = order.reverse().map(function(interactObject) {

          //
          // Convert output from interact objects to
          // user friendly layer objects, unless it is already one
          //

          if (!interactObject.list) {
            return getLayerObjectFromLayerElement(interactObject.element());
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

    //
    // Return layers in order. Currently deturmined by their order
    // in the DOM.
    // TODO: optionally read order from a data attribute on the layer
    //       element
    //
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

    //
    // Appends a markup string to the DOM as DOM elements
    //
    function append(rootNode, html) {
      var div = document.createElement("div");
      div.innerHTML = html;
      while (div.children.length > 0) {
        rootNode.appendChild(div.children[0]);
      }

      return rootNode;
    }

    //
    // Return the parent of this element which has the passed class. if
    // the startingElement has the class it will be returned. The depth
    // defaults to 10
    //
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

    //
    // Prompts user for data for a  layer. If this is passed a button Node
    // it will create a layer, if it is a layer node, it will update it
    //
    function promptUserForLayerData(buttonNodeOrLayerNode, callback) {

      var type = buttonNodeOrLayerNode.classList.contains("draggable") ? "edit" : "add",
          formParent = (type === "add") ? buttonNodeOrLayerNode.parentNode : buttonNodeOrLayerNode.parentNode.parentNode.querySelector("h2");


      inputFormNode = formParent.querySelector(".input-form");

      //
      // Rise above!
      //
      formParent.style.zIndex = 1;

      //
      // Add input form for this menu group if it
      // does not already exist
      //
      if (!inputFormNode) {
        append(formParent, processTemplate(inputFormTemplate, {
          "layerid" : buttonNodeOrLayerNode.getAttribute("data-for")
        }));
        inputFormNode = formParent.querySelector(".input-form");

        if (type === "edit") {
          inputFormNode.uri = buttonNodeOrLayerNode.getAttribute("data-uri");
          inputFormNode.label = buttonNodeOrLayerNode.getAttribute("data-label");
        }

        inputFormNode.querySelector("button").addEventListener("click", function(e) {

          e.preventDefault();

          console.log("Clicked", e.target.parentNode.parentNode);

          e.target.parentNode.parentNode.classList.add("hidden");

          //
          // Sit back down
          //
          formParent.style.zIndex = "inherit";

          if (typeof callback === "function") {
            callback(inputFormNode);
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

    function createLayer (layerObject) {

      var layerNode;

      layerObject.id = getUniqueId();

      //
      // Append new layer item in menu
      //
      append(
        getLayerGroupNode(layerObject.list),
        processTemplate(layerTemplate, layerObject)
      );

      layerNode = rootNode.querySelector(".layer-item-" + layerObject.id);

      layers[layerNode.getAttribute("data-id")] = interact(layerNode).draggable(dragConfig).dropzone(dropConfig);

      layerNode.addEventListener("click", function(e) {

        if (e.target.classList.contains("delete-icon")) {

          e.preventDefault();

          var layerElement = e.target.parentNode;

          layerElement.parentNode.removeChild(layerElement);
          triggerOrderChange();
        }

      });

      layerNode.addEventListener("dblclick", function() {
        promptUserForLayerData(layerNode, function() {
          console.log(arguments);
        });
      });

      that.fire("layerAdded", getLayerObjectFromLayerElement(layerNode));
    }

    //
    // Builds an object from data attributes in the layer
    // element
    //
    function getLayerObjectFromLayerElement (element) {
      return {
        "list"    : element.getAttribute("data-list"),
        "label"   : element.getAttribute("data-label"),
        "uri"     : element.getAttribute("data-uri"),
        "id"      : element.getAttribute("data-id"),
        "color"   : element.getAttribute("data-color"),
        "element" : element
      };
    }

    //
    // Returns full ui state object
    //
    function getMenuState() {
      return Object.keys(layers).map(function(key) {
        return getLayerObjectFromLayerElement(layers[key].element());
      });
    }

    function onClickLayerAddAction (e) {
      promptUserForLayerData(e.target, function() {
        var formNode     = e.target.parentNode.querySelector("form"),
            layerGroupId = e.target.getAttribute("data-for");

        //
        // Register new layer
        //
        createLayer({
          "label" : formNode.label.value,
          "color" : getNewColor(),
          "list" : layerGroupId,
          "uri"   : formNode.uri.value
        });

      });
    }

    function initColorPicker() {

      //
      // Test for native color picker support
      //
      var input   = document.createElement("input"),
          isSupported;

      //
      // Test for native color picker support
      // Test inspired by https://bgrins.github.io/spectrum/
      //
      input.type  = "color";
      input.value = "!";
      isSupported = (input.type === "color" && input.type !== "!");

      //
      // If isSupported is true, this browser supports native color
      // picking using the input[type=color] element
      //
      that.on("layerAdded", function(layer) {
        var pickerNode = layer.caller.element.querySelector(".color-picker"),
            panelNode  = document.querySelector(".color-picker-panel");

        if (isSupported) {

          pickerNode.addEventListener("change", function(e) {
            e.target.parentNode.setAttribute("data-color", e.target.value);

            that.fire("color-change", getLayerObjectFromLayerElement(e.target.parentNode));
          });
        } else {

          pickerNode.classList.add("polyfill");
          pickerNode.style.backgroundColor = pickerNode.value;
          pickerNode.style.cursor = "pointer";
          pickerNode.style.color = "transparent";

          if (!panelNode) {
            append(rootNode, processTemplate(colorPickerTemplate, {}));
            panelNode  = document.querySelector(".color-picker-panel");
          }

          pickerNode.addEventListener("click", function(e) {

            e.target.parentNode.parentNode.insertBefore(panelNode, e.target.parentNode);
            e.target.parentNode.parentNode.insertBefore(e.target.parentNode, panelNode); //TODO: There is probably a better way to flip these around
            panelNode.style.top     = (e.target.parentNode.offsetTop) + "px";
            panelNode.style.left    = (e.target.parentNode.offsetLeft) + "px";
            panelNode.style.display = "block";
            panelNode.setAttribute("data-for", layer.caller.id);
          });

        }
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
      // Make layers to match marker state
      //
      if (options.menuState && options.menuState.length) {
        options.menuState.forEach(function (layerObject) {

          createLayer(layerObject);

        });
      }

      //
      // Handle click events
      //
      rootNode.addEventListener("click", function(e) {
        var layerObject, layerNode;

        //
        // Listener for add layer action
        //
        if (e.target.classList.contains("add-action")) {
          onClickLayerAddAction.apply(this, arguments);
        }

        //TODO: Turn this into a color input polyfill module
        //
        // Choose a color. This interface is only shown on browsers
        // which do not support the color input type
        //
        if (e.target.classList.contains("color")) {
          layerObject = layers[e.target.parentNode.getAttribute("data-for")];
          layerNode   = layerObject.element();

          layerNode.setAttribute("data-color", e.target.style.backgroundColor);
          e.target.parentNode.style.display = "none";
          layerNode.querySelector(".color-picker").setAttribute("value", e.target.style.backgroundColor);
          layerNode.querySelector(".color-picker").style.backgroundColor = e.target.style.backgroundColor;
          that.fire("color-change", getLayerObjectFromLayerElement(layerNode));
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
    that.getMenuState  = getMenuState;

    //
    // Here we go
    //

    initColorPicker();
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
