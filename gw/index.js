var selected_state_code = null
document.getElementById('slider').addEventListener('input', function(e) {
  var consump = parseInt(e.target.value);
  // update the map
  // map.setFilter('collisions', ['==', ['number', ['get', 'Hour']], hour]);

  // converting 0-23 hour to AMPM format
  // var ampm = hour >= 12 ? 'PM' : 'AM';
  // var hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-consump').innerText = consump;
});
document.getElementById('slider2').addEventListener('input', function(e) {
  var consump = parseInt(e.target.value);
  // update the map
  // map.setFilter('collisions', ['==', ['number', ['get', 'Hour']], hour]);

  // converting 0-23 hour to AMPM format
  // var ampm = hour >= 12 ? 'PM' : 'AM';
  // var hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-rain-harvest').innerText = consump;
});



    slide_right_panel_in = () =>{
        var $slider = document.getElementById('right-panel');
        $slider.setAttribute('class', 'right-panel panel slide-in');
        // console.log(selected_state_code)
    }
    slide_right_panel_out = () =>{
        var $slider = document.getElementById('right-panel');
        $slider.setAttribute('class', 'right-panel panel slide-out');
    }


explore =()=>{
    document.getElementById
}



// <!-- <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script> -->
// <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script> -->



    // var gwjson = (function() {
    //     var json = null;
    //     $.ajax({
    //         'async': false,
    //         'global': false,
    //         'url': "/gw-data.json",
    //         'dataType': "json",
    //         'success': function (data) {
    //             json = data;
    //         }
    //     });
    //     return json;
    // })();
    // console.log(gwdata['HP'])
    // L.mapbox.accessToken = 'pk.eyJ1IjoiaW5pdGRvdCIsImEiOiJ3VkkxTldvIn0.7UPZ8q9fgBE70dMV7e0sLw';
        L.mapbox.accessToken = 'pk.eyJ1IjoibmlsYXlwYXRoYWsiLCJhIjoiY2p4NzdhczY5MDZzbTNvanlxZ21rcjV2NiJ9.tXolnfCCQLEATfnEosvkeg';
    // var map = L.mapbox.map('map').setView([21.836006, 87.824707], 5).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));
    // var map = L.mapbox.map('map').setView([21.836006, 87.824707], 5).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v10'));
    // var map = L.mapbox.map('map').setView([22, 82.82], 5).addLayer(L.mapbox.styleLayer('mapbox://styles/nilaypathak/cjx7b20ar0nq71cmqqjtfanxx'));
    var map = L.mapbox.map('map', null, { zoomControl:false }).setView([22, 82.82], 5).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9'));
    map.scrollWheelZoom.disable();
    // map.ZoomControl.disable();

        // color reference from color brewer
        mapBrew = ['rgb(255,255,204)','rgb(231, 207, 143)','rgb(220, 164, 101)','rgb(222, 145, 69)','rgb(203, 73, 38)','rgb(184, 15, 45)','rgb(179, 0, 47)'],
        // population density range used for choropleth and legend
        mapRange = [ 10, 8, 6, 4, 2, 1, 0 ]; 

    // map legend for population density
    var legend = L.mapbox.legendControl( { position: "bottomright" } ).addLegend( getLegendHTML() ).addTo(map),
        // popup for displaying state census details
        popup = new L.Popup({ autoPan: false, className: 'statsPopup' }),
        // layer for each state feature from geojson
        statesLayer,
        closeTooltip;
        var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        if(props){
        var infoData = {
            state: gwdata[props.code].name,
            gw_dep:Math.round(- gwdata[props.code].gw_dep * 100) / 100,
            consump:Math.round(gwdata[props.code].consumption)
        };
        var infoContent = L.mapbox.template( d3.select("#info-template").text() , infoData );
    }
        document.getElementById('info-container').innerHTML = (props ?
            infoContent
            : 'Select a State');
    };

    info.addTo(map);
    // fetch the state geojson data
    var statesDataGlobal ={}
    var selected_state = null
    d3.json( "india-states.json", function (statesData) {
        statesDataGlobal = statesData
        statesLayer = L.geoJson(statesDataGlobal,  {
            style: getStyle,
            onEachFeature: onEachFeature
        });
        statesLayer.addTo(map,'state-label-lg');
    } );
    function resetmap(){

        update({a: 2, b: 2, c:2})
        update2({a: 2, b: 1, c:3})
        update_bar_chart()
        map.setView([22, 82.82], 5,3)
        statesLayer = L.geoJson(statesDataGlobal,  {
            style: getStyle,
            onEachFeature: onEachFeature
        });
        map.removeLayer(selected_state)
        map.addLayer(statesLayer)
        document.getElementById('close-btn').style.display = 'none'
        slide_right_panel_out()

    }
    function getStyle(feature) {
        // console.log(feature.properties.code)
        return {
            weight: 2,
            opacity: 0.1,
            color: 'black',
            fillOpacity: 0.85,
            fillColor: getDensityColor( -gwdata[feature.properties.code].gw_dep )
            // fillColor: getDensityColor( indiaCensus.states[feature.properties.code].density )
        };
    }

    // get color depending on population density value
    function getDensityColor(d) {
        var colors = Array.prototype.slice.call(mapBrew).reverse(), // creates a copy of the mapBrew array and reverses it
             range = mapRange;

        return  d > range[0] ? colors[0] :
                d > range[1] ? colors[1] :
                d > range[2] ? colors[2] :
                d > range[3] ? colors[3] :
                d > range[4] ? colors[4] :
                d > range[5] ? colors[5] :
                colors[6];
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mousemove: mousemove,
            mouseout: mouseout,
            click: zoomToFeature
        });
    }

    function mousemove(e) {    
        var layer = e.target;

        var popupData = {
            state: indiaCensus.states[layer.feature.properties.code].name,
            // density: indiaCensus.states[layer.feature.properties.code].density,
            // area: indiaCensus.states[layer.feature.properties.code].area,
            // growth: indiaCensus.states[layer.feature.properties.code].growth,
            // population: indiaCensus.states[layer.feature.properties.code].population,
            // capital: indiaCensus.states[layer.feature.properties.code].capital.name ,
            // groundwater:gwdata[layer.feature.properties.code].gw_dep
        };

        popup.setLatLng(e.latlng);

        var popContent = L.mapbox.template( d3.select("#popup-template").text() , popupData );
        popup.setContent( popContent );

        if (!popup._map) popup.openOn(map);
        window.clearTimeout(closeTooltip);

        // highlight feature
        layer.setStyle({
            weight: 2,
            opacity: 0.3,
            fillOpacity: 0.9
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        // update the graph with literacy and sex ratio data
        // updateGraph( indiaCensus.states[layer.feature.properties.code] );
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#fff',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    function mouseout(e) {
        statesLayer.resetStyle(e.target);
        closeTooltip = window.setTimeout(function() {
            // ref: https://www.mapbox.com/mapbox.js/api/v2.1.6/l-map-class/
            map.closePopup( popup ); // close only the state details popup
        }, 100);
    }

    function zoomToFeature(e) {
        // map.fitBounds(e.target.getBounds());
        selected_state_code =  e.target.feature.properties.code
        document.getElementById('close-btn').style.display = 'block'
        map.removeLayer(statesLayer)

        update({a: 1, b: 2, c:3})
        update2({a: 3, b: 1, c:2})
        update_bar_chart()
        for(var i = 0; i < statesDataGlobal.features.length; i++)
        {
            // console.log(statesDataGlobal.features[i].properties.code == e.target.feature.properties.code)
          if(statesDataGlobal.features[i].properties.code == e.target.feature.properties.code)
          {
            d3.json( "india-states.json", function (statesData) {
                statesData = statesDataGlobal.features[i]
                statesLayer = L.geoJson(statesData,  {
                    style: getStyle,
                    onEachFeature: onEachFeature
                });
                statesLayer.addTo(map);
                selected_state = statesLayer
            } );
            break;
          }
        }

        // console.log('zoomed')
        
        map.setView(e.latlng, 6);
    }

    function getLegendHTML() {
        var grades = Array.prototype.slice.call(mapRange).reverse(), // creates a copy of ranges and reverses it
            labels = [],
            from, to;
        // color reference from color brewer
        var brew = mapBrew;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + brew[i] + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        return '<span>Groundwate Depletion Cm/Year</span><br>' + labels.join('<br>');
    }
    

 //    // ref: https://www.mapbox.com/mapbox.js/api/v2.1.6/l-icontrol/
	// var PieGraphControl = L.Control.extend({	
 //        options: {
	// 		position: 'topleft'
	// 	},

	// 	onAdd: function (map) {
	// 		// create the control container with a particular class name
	// 		var container = L.DomUtil.create('div', 'pie-graph');
	// 		// ... initialize other DOM elements, add listeners, etc.
	// 		return container;
	// 	}
	// });

 //    var BarGraphControl = L.Control.extend({   
 //        options: {
 //            position: 'topright'
 //        },

 //        onAdd: function (map) {
 //            // create the control container with a particular class name
 //            var container = L.DomUtil.create('div', 'bar-graph');
 //            // ... initialize other DOM elements, add listeners, etc.
 //            return container;
 //        }
 //    });

 //    // add the piegraph and bar graph container
	// map.addControl( new PieGraphControl() )
 //        .addControl( new BarGraphControl() );

 //    // START: Pie Graph
 //    var width = 250, 
 //        height = 150,
 //        pieColors = {
 //            male: "steelblue",
 //            female: "pink"
 //        };

 //    var pieName = d3.select(".pie-graph")
 //                        .append("div")
 //                    .text("Delhi")
 //                    .style("color", "white")
 //                    .style("font-size", "15px")
 //                    .style("font-weight", "bold")
 //                    .style("margin", "6px 0");

 //    // append the svg elements to the graph containers 
 //    var pieSvg = d3.select(".pie-graph")
 //                .append("svg")
 //                .attr("id", "pie-graph")
 //                .attr("width", width)
 //                .attr("height", height)
 //                    .append("g")
 //                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 //    var pieLegend = d3.select(".pie-graph")
 //                        .append("div")
 //                        .attr("id", "pie-legend");
    
 //    pieLegend.append("i")
 //            .style("background", pieColors.female)
 //            .style("padding", "5px")
 //            .style("color", "black")
 //            .text("Female");

 //    pieLegend.append("i")
 //            .style("background", pieColors.male)
 //            .style("padding", "5px")
 //            .style("color", "black")
 //            .text("Male");      

 //    pieLegend.append("div")
 //                .html("<strong>Sex Ratio: </strong>Females for every 1000 Males")
 //                .style("color", "white")
 //                .style("margin-top", "5px");

	// var pieRadius = 60;

 //    var arc = d3.svg.arc()
 //                .outerRadius( pieRadius - 5 )
 //                .innerRadius( 0 );

 //    var pieData = [];

 //    // initial data for Delhi
 //    pieData.push( { type: "male", ratio: 1000, color: pieColors.male } );
 //    pieData.push( { type: "female", ratio: 868, color: pieColors.female } );

 //    var pie = d3.pie()
 //                .sort(null)
 //                .value( function(d) { return d.ratio; } )
 //                // realigns the sector in the circle 
 //                .startAngle(3*Math.PI)
 //                .endAngle(1*Math.PI)
 //                // enable this for half circle view
 //                //.startAngle(-90 * (Math.PI/180))
 //                //.endAngle(90 * (Math.PI/180))
 //                ;

 //    var piePieces = pieSvg.selectAll(".pie-piece")
 //                        .data( pie(pieData) )
 //                            .enter().append("g")
 //                        .attr("class", "pie-piece");

 //    piePieces.append("path")
 //            .attr("d", arc)
 //            .style("fill", function(d) { return d.data.color; } )
 //            // the data is bound to the parent 'pie-piece' element
 //            // but we need the data in the child path element for animating the arc
 //            // store the oldangle data in the path element to animate the arc
 //            .each( function(d) { this._oldAngle = d; } );         

 //    piePieces.append("text")
 //                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; } )
 //                .attr("dy", ".35em")
 //                .style("text-anchor", "middle")
 //                .text( function(d) { return d.data.ratio; } );
 //    // END: Pie Graph

 //    // START: Bar Graph (Literacy)
 //    var barWidth = 250,
 //        barHeight = 180,
 //        barSize = 50,
 //        // attach the literacy data for 'Delhi' initially
 //        literacyData = [ 86.21 ];

 //    var barName = d3.select(".bar-graph")
 //                        .append("div")
 //                    .text("Delhi")
 //                    .style("color", "white")
 //                    .style("font-size", "15px")
 //                    .style("font-weight", "bold")
 //                    .style("margin", "6px 0");

 //    var barHolder = d3.select(".bar-graph")
 //                            .append("svg")
 //                        .attr("id", "literacy-bar")
 //                        .attr("width", barWidth)
 //                        .attr("height", barHeight)
 //                            .append("rect")
 //                        .attr("width", barSize)
 //                        .attr("height", barHeight)
 //                        .attr("x", (barWidth-barSize)/2)
 //                        .style("color", getLiteracyColor( literacyData[0] ) );

 //    var barLegend = d3.select(".bar-graph")
 //                            .append("div")
 //                        .style("color", "white")
 //                        .style("font-weight", "bold")
 //                        .style("font-size", "15px")
 //                        .text("Literacy: ")
 //                            .append("span")
 //                        .attr("id", "literacy-percent")
 //                        .text(literacyData[0].toFixed(2) + "%")
 //                        .style("color", getLiteracyColor( literacyData[0] ) );

 //    var litBar = d3.select("#literacy-bar").selectAll("rect")
 //                        .data( literacyData )
 //                        .attr("height", function(d) {
 //                            var h = barHeight*(d/100);
 //                            return h;
 //                        })
 //                        .attr("y", function(d) {
 //                            var h = barHeight*(d/100),
 //                                nh = barHeight - h;
 //                            return nh;
 //                        })
 //                        .style("fill",  function(d) { return getLiteracyColor(d); } );
 //    // END: Bar Graph (Literacy)

 //    // START: Updates both Pie Graph and Bar Graph
    // function updateGraph ( graphData ) {
    //     // Update Pie Graph
    //     pieData = [];

    //     pieData.push( { type: "male", ratio: 1000, color: pieColors.male } );
    //     pieData.push( { type: "female", ratio: graphData.sexratio, color: pieColors.female } );

    //     // update pie
    //     var pieUpdate = pieSvg.selectAll(".pie-piece")
    //                             // bind the new updated data
    //                             .data( pie(pieData) );
    //     // update pie arc
    //     pieUpdate.select("path")
    //                 .transition().delay(300).attrTween("d", function(d) {
    //                     // we have stored the angle data in path element in _oldAngle
    //                     var i = d3.interpolate( this._oldAngle, d );
    //                     // update the old angle data with current angle data
    //                     this._oldAngle = i(0);
    //                     //return a functor
    //                     return function(t) {
    //                         return arc( i(t) );
    //                     }
    //                 });
 //        // update pie text
 //        pieUpdate.select("text")
 //                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; } )
 //                .attr("dy", ".35em")
 //                .style("text-anchor", "middle")
 //                .text( function(d) { return d.data.ratio; } );
 //        // update state name in pie graph
 //        pieName.text( graphData.name );

 //        // Update Bar Graph
 //        barName.text( graphData.name );

 //        literacyData = [];
 //        literacyData.push( +graphData.literacy );

 //        d3.select("#literacy-bar").selectAll("rect")
 //                        .data( literacyData )
 //                        .transition().duration(500)
 //                        .attr("height", function(d) {
 //                            var h = barHeight*(d/100);
 //                            return h;
 //                        })
 //                        .attr("y", function(d) {
 //                            var h = barHeight*(d/100),
 //                                nh = barHeight - h;
 //                            return nh;
 //                        })
 //                        .style("fill",  function(d) { return getLiteracyColor(d); } );

 //        barLegend.text( graphData.literacy.toFixed(2) + "%" )
 //                .transition().duration(500)
 //                .style("color", getLiteracyColor(+graphData.literacy) );
 //    }// END: updateChart()

 //    function getLiteracyColor (literacy) {
 //        // color from colorbrew
 //        var literacyBrew = ['rgb(215,25,28)','rgb(253,174,97)','rgb(166,217,106)','rgb(26,150,65)'].reverse(),
 //            literacyRange = [ 90, 80, 70, 60];

 //        literacy = +literacy;

 //        return literacy > literacyRange[0] ? literacyBrew[0] : 
 //                literacy > literacyRange[1] ? literacyBrew[1] :
 //                literacy > literacyRange[2] ? literacyBrew[2] :
 //                literacyBrew[3];
 //    }

    // draw the layer with capital markers
    var capitalLayer;

    drawCapitalMarkers();

    // add the capitals toggle checkbox
    var capitalFilter = document.getElementById("capitals-filter"),
        capitalFilterDiv = document.getElementById("capitals-filter-div");

    capitalFilter.addEventListener("change", function(){
        this.checked ? map.addLayer(capitalLayer) : map.removeLayer(capitalLayer);
    });

    setCapitalFilterPosition();

    function drawCapitalMarkers () {
        var capitalGeoJson = [];

        for (var state in indiaCensus.states) {
            var capitalData = indiaCensus.states[state].capital;
            // capital marker geojson data
            capitalData.details.forEach( function ( capital, index ) {
                // location is normally in (latitude, longitude) format
                // but for geojson the format is  (longitude, latitude)
                capitalGeoJson.push({
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      // make an array copy and reverse the co-ordinates to (long,lat) for geojson
                      "coordinates": Array.prototype.slice.call(capital.coordinates).reverse()
                    },
                    "properties": {
                      "title": capital.name,
                      "description": capital.population ? "<strong>Population: </strong>" + capital.population : "(census data not available)",
                      "data": capital,
                      "marker-color": "#ffb90f",
                      "marker-size": "small",
                      "marker-symbol": "star"
                    }
                });
            } ); // end of 'forEach'
        } // end of 'for in'

        // add the marker layer
        capitalLayer = L.mapbox.featureLayer( capitalGeoJson ).addTo( map );
        // open the popup on hover
        capitalLayer.on('mouseover', function(e) {      
            e.layer.openPopup();
            // update the graph if census details is present
            if (e.layer.feature.properties.data.sexratio) {
                // updateGraph( e.layer.feature.properties.data );
            }
        });

        capitalLayer.on('mouseout', function(e) {
            e.layer.closePopup();
        });
    }   

    function setCapitalFilterPosition () {
        var gistWidth = 960,
            gistHeight = 707; 
        capitalFilterDiv.style.top = 0.5*gistHeight + "px";
        capitalFilterDiv.style.left = 0.78*gistWidth + "px";
        // adjust the defalut gist preview height
        d3.select(self.frameElement).style("height", gistHeight + "px");
    }

