function addCommas(e){e+="";for(var a=e.split("."),t=a[0],i=a.length>1?"."+a[1]:"",s=/(\d+)(\d{3})/;s.test(t);)t=t.replace(s,"$1,$2");return t+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0==a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}!function(e){e.fn.confirmModal=function(a){function t(e,a){}var i=e("body"),s={confirmTitle:"Please confirm",confirmMessage:"Are you sure you want to perform this action ?",confirmOk:"Yes",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:t,confirmDismiss:!0,confirmAutoOpen:!1},o=e.extend(s,a),r='<div class="modal fade" id="#modalId#" tabindex="-1" role="dialog" aria-labelledby="#AriaLabel#" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>#Heading#</h3></div><div class="modal-body"><p>#Body#</p></div><div class="modal-footer">#buttonTemplate#</div></div></div></div>';return this.each(function(a){var t=e(this),s=t.data(),n=(e.extend(o,s),"confirmModal"+Math.floor(1e9*Math.random())),l=r,c='<button class="btn btn-default" data-dismiss="modal">#Cancel#</button><button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button>';"ltr"==o.confirmDirection&&(c='<button class="btn btn-#Style#" data-dismiss="ok">#Ok#</button><button class="btn btn-default" data-dismiss="modal">#Cancel#</button>');var d=o.confirmTitle;"function"==typeof o.confirmTitle&&(d=o.confirmTitle.call(this));var m=o.confirmMessage;"function"==typeof o.confirmMessage&&(m=o.confirmMessage.call(this)),l=l.replace("#buttonTemplate#",c).replace("#modalId#",n).replace("#AriaLabel#",d).replace("#Heading#",d).replace("#Body#",m).replace("#Ok#",o.confirmOk).replace("#Cancel#",o.confirmCancel).replace("#Style#",o.confirmStyle),i.append(l);var p=e("#"+n);t.on("click",function(e){e.preventDefault(),p.modal("show")}),e('button[data-dismiss="ok"]',p).on("click",function(e){o.confirmDismiss&&p.modal("hide"),o.confirmCallback(t,p)}),o.confirmAutoOpen&&p.modal("show")})}}(jQuery);var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,a,t){allLayers=[]}),function(){"use strict"}();var crsra=crsra||{bookmarks:[],globals:{mapCenter:[-82.7863,42.5864]}},map,zonalStatsGP,maxLegendHeight,maxLegendDivHeight,printCount=0,storageName="esrijsapi_mapmarks",mapLayers=[],mapLayerIds=[];require(["esri/map","esri/dijit/OverviewMap","esri/SnappingManager","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/Bookmarks","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Search","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","esri/tasks/GeometryService","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/tasks/LegendLayer","esri/SpatialReference","esri/geometry/Extent","esri/config","esri/urlUtils","esri/request","dojo/_base/array","dojo/_base/lang","dojo/keys","dojo/cookie","dojo/has","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/on","dojo/domReady!"],function(e,a,t,i,s,o,r,n,l,c,d,m,p,u,g,h,y,b,v,f,k,L,S,w,x,C,M,R,D,I,T,A,z,P){function O(){if(U){var e=[];C.forEach(crsra.bookmarks,function(a){a.userCreated===!1&&e.push(a.id)});for(var a=crsra.bookmarks.slice(),t=0;t<a.length;t++){var i=a[t];-1!==e.indexOf(i.id)&&(a.splice(t,1),t--)}console.log(a);var s=JSON.stringify(a);window.localStorage.setItem(storageName,s)}else{var o=7;D(storageName,dojo.toJson(crsra.bookmarks),{expires:o})}}function B(){U?window.localStorage.removeItem(storageName):dojo.cookie(storageName,null,{expires:-1});var e=[];C.forEach(crsra.bookmarks,function(a){a.userCreated===!0&&e.push(a.id)});for(var a=0;a<crsra.bookmarks.length;a++){var t=crsra.bookmarks[a];-1!==e.indexOf(t.id)&&(crsra.bookmarks.splice(a,1),a--)}C.forEach(e,function(e){$("#"+e).remove()})}function E(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function F(){$("#shareModal").modal("show");var e=map.extent,a="?xmax="+e.xmax.toString()+"&xmin="+e.xmin.toString()+"&ymax="+e.ymax.toString()+"&ymin="+e.ymin.toString(),t="%3Fxmax="+e.xmax.toString()+"%26xmin="+e.xmin.toString()+"%26ymax="+e.ymax.toString()+"%26ymin="+e.ymin.toString(),i="http://glcwra.wim.usgs.gov/crsra/",s=i+a,o=i+t;console.log("Share URL is:"+s),$("#showFullLinkButton").click(function(){$("#fullShareURL").html('<span id="fullLinkLabel" class="label label-default"><span class="glyphicon glyphicon-link"></span> Full link</span><br><textarea style="margin-bottom: 10px; cursor: text" class="form-control"  rows="3" readonly>'+s+"</textarea>")}),$("#showShortLinkButton").click(function(){$.ajax({dataType:"json",type:"GET",url:"https://api-ssl.bitly.com/v3/shorten?access_token=e1a16076cc8470c65419920156e0ae2c4f77850f&longUrl="+o,headers:{Accept:"*/*"},success:function(e){var a=e.data.url;$("#bitlyURL").html('<span class="label label-default"><span class="glyphicon glyphicon-link"></span> Bitly link</span><code>'+a+"</code>")},error:function(e){$("#bitlyURL").html('<i class="fa fa-exclamation-triangle"></i> An error occurred retrieving shortened Bitly URL')}})})}function G(){$("#printModal").modal("show")}function j(){$("#bookmarkModal").modal("show")}function V(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+l+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem"),$("#printExecuteButton").button("reset")}var t=new b;t.map=map;var i=new v;i.exportOptions={width:500,height:400,dpi:300};var s=map.getZoom(),o="";s>=9&&(o="9"),s>=11&&(o="11"),s>=15&&(o="15"),i.showAttribution=!1,i.format="PDF",i.layout="Letter ANSI A LandscapeGLCWRA"+o,i.preserveScale=!1;var r=new f;r.layerId="normalized",r.subLayerIds=[0];var n=$("#printTitle").val();""===n?i.layoutOptions={titleText:"Connecting River Systems Restoration Assessment - Provisional Data",authorText:"Connecting River Systems Restoration Assessment (CRSRA)",copyrightText:"This page was produced by the CRSRA web application at glcwra.wim.usgs.gov/crsra",legendLayers:[r]}:i.layoutOptions={titleText:n+" - Provisional Data",authorText:"Connecting River Systems Restoration Assessment (CRSRA)",copyrightText:"This page was produced by the CRSRA web application at glcwra.wim.usgs.gov/crsra",legendLayers:[r]};var l=i.layoutOptions.titleText;t.template=i;var c=new y("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");c.execute(t,e,a)}function H(){var e=$("#bookmarkTitle"),a=map.extent.toJson(),t=e.val();if(t.length>0){var i=t.toLowerCase().replace(/ /g,"-");a.name=t,a.id=i,a.userCreated=!0,crsra.bookmarks.push(a);var s=i+"_delete",o=$('<tr id="'+i+'"><td  class="bookmarkTitle td-bm">'+t+'</td><td class="text-right text-nowrap"> <button id="'+s+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" > <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(o),$("#"+s).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+i).remove();for(var e=0;e<crsra.bookmarks.length;e++){var a=crsra.bookmarks[e];-1!==i.indexOf(a.id)&&crsra.bookmarks.splice(e,1)}O()}}),e.val(""),O(),$("#bmAlert").hide(),$("#bookmarkModal").modal("hide")}else $("#bmAlert").show()}function N(){var e=esri.urlToObject(document.location.href);if(e.query){var a=new L(parseFloat(e.query.xmin),parseFloat(e.query.ymin),parseFloat(e.query.xmax),parseFloat(e.query.ymax),new k({wkid:102100}));map.setExtent(a);var t=document.location.href,i=t.substring(0,t.indexOf("?"));history.pushState(null,"",i)}}var U=E(),q=new c({},z.create("div"));A.add(q.domNode),map=new e("mapDiv",{basemap:"gray",center:crsra.globals.mapCenter,spatialReference:26917,zoom:9,logo:!1,minZoom:9,infoWindow:q}),S.defaults.geometryService=new h("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),esri.config.defaults.io.corsEnabledServers.push("http://gis.wim.usgs.gov/");const W=new i({map:map},"homeButton");W.startup();const _=new s({map:map},"locateButton");_.startup();const Y=new o({map:map,advancedLocationUnits:!0},T.byId("measurementDiv"));Y.startup();var X;if(X=U?window.localStorage.getItem(storageName):dojo.cookie(storageName),X&&"null"!==X&&X.length>4){console.log("cookie: ",X,X.length);var Z=dojo.fromJson(X);C.forEach(Z,function(e){crsra.bookmarks.push(e)})}else console.log("no stored bookmarks...");const J=new a({map:map,attachTo:"bottom-right"});J.startup();var K=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(K),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#shareNavButton").click(function(){F()}),$("#printNavButton").click(function(){G()}),$("#addBookmarkButton").click(function(){j()}),$("#printExecuteButton").click(function(){$(this).button("loading"),V()}),$("#print-title-form").on("keypress",function(e){13==e.keyCode&&($("#printExecuteButton").button("loading"),V())}),$("#bookmarkSaveButton").click(function(){H()}),$("#bookmark-title-form").on("keypress",function(e){13==e.keyCode&&H()}),$("#bookmarkDismissButton").click(function(){$("#bmAlert").hide()}),P(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4)),N()}),P(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),P(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var a=g.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(4)),$("#longitude").html(a.x.toFixed(4))}}),P(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=g.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(4)),$("#longitude").html(e.x.toFixed(4))});var Q=new n("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(Q),P(T.byId("btnStreets"),"click",function(){map.setBasemap("streets"),Q.setVisibility(!1)}),P(T.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),Q.setVisibility(!1)}),P(T.byId("btnGray"),"click",function(){map.setBasemap("gray"),Q.setVisibility(!1)}),P(T.byId("btnOSM"),"click",function(){map.setBasemap("osm"),Q.setVisibility(!1)}),P(T.byId("btnTopo"),"click",function(){map.setBasemap("topo"),Q.setVisibility(!1)}),P(T.byId("btnNatlMap"),"click",function(){Q.setVisibility(!0)});var ee=new l({map:map},"geosearch");ee.startup(),P(ee,"search-results",function(e){$("#geosearchModal").modal("hide")}),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#scaleAlertClose").click(function(){$("#parcelSelectScaleAlert").hide()}),$("#goToScale").click(function(){$("#parcelSelectScaleAlert").hide();var e=map.getLayer("parcelsFeat").minScale;map.setScale(e)}),$("#IEwarnContinue").click(function(){$("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show")}),-1!==navigator.userAgent.indexOf("MSIE")||navigator.appVersion.indexOf("Trident/")>0?$("#IEwarningModal").modal("show"):($("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show")),$(window).width()<767&&$("#legendCollapse").addClass("collapse"),$("#html").niceScroll();var t=$("#sidebar");t.niceScroll(),t.scroll(function(){$("#sidebar").getNiceScroll().resize()});var i=$("#legendCollapse"),s=$("#legendElement"),o=$("#legendDiv");$("#legendDiv").niceScroll({autohidemode:!1}),maxLegendHeight=.9*$("#mapDiv").height(),s.css("max-height",maxLegendHeight),i.css("max-height",maxLegendHeight),o.css("max-height",maxLegendHeight),i.on("shown.bs.collapse",function(){$("#legendLabel").show(),maxLegendHeight=.9*$("#mapDiv").height(),s.css("max-height",maxLegendHeight),i.css("max-height",maxLegendHeight),o.css("max-height",maxLegendHeight),s.css("height",maxLegendHeight),i.css("height",maxLegendHeight),maxLegendDivHeight=s.height()-parseInt($("#legendHeading").css("height").replace("px","")),o.css("height",maxLegendDivHeight)}),i.on("hide.bs.collapse",function(){s.css("height","initial"),window.innerWidth<=767&&$("#legendLabel").hide()});var r=$("#measurementCollapse");r.on("shown.bs.collapse",function(){$("#measureLabel").show()}),r.on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()}),$(function(){$("[data-hide]").on("click",function(){$("."+$(this).attr("data-hide")).hide()})}),crsra.bookmarks.forEach(function(e){if(e.userCreated===!1){var a=$('<tr id="'+e.id+'"><td class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"></td> </tr>');$("#bookmarkList").append(a)}else{var t=e.id+"_delete",i=$('<tr id="'+e.id+'"><td  class="bookmarkTitle td-bm">'+e.name+'</td><td class="text-right text-nowrap"> <button id="'+t+'" class="btn btn-xs btn-warning bookmarkDelete" data-toggle="tooltip" data-placement="top" title="Delete bookmark"> <span class="glyphicon glyphicon-remove"></span> </button> </td> </tr>');$("#bookmarkList").append(i),$("#"+t).confirmation({placement:"left",title:"Delete this bookmark?",btnOkLabel:"Yes",btnCancelLabel:"Cancel",popout:!0,onConfirm:function(){$("#"+e.id).remove();for(var a=0;a<crsra.bookmarks.length;a++){var t=crsra.bookmarks[a];-1!==e.id.indexOf(t.id)&&crsra.bookmarks.splice(a,1)}O()}})}}),$("body").on("click",".td-bm",function(){var e=this.parentNode.id;crsra.bookmarks.forEach(function(a){if(a.id==e){var t=new L(a.xmin,a.ymin,a.xmax,a.ymax,new k(a.spatialReference));map.setExtent(t)}})}),$('[data-toggle="tooltip"]').tooltip({delay:{show:500,hide:0}}),$("#removeBookmarksButton").confirmModal({confirmTitle:"Delete user bookmarks from memory",confirmMessage:"This action will remove all user-defined bookmarks from local memory on your computer or device. Would you like to continue?",confirmOk:"Yes, delete bookmarks",confirmCancel:"Cancel",confirmDirection:"rtl",confirmStyle:"primary",confirmCallback:B,confirmDismiss:!0,confirmAutoOpen:!1})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/Geoprocessor","esri/tasks/FeatureSet","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/toolbars/draw","esri/SpatialReference","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/LabelLayer","esri/symbols/TextSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/InfoTemplate","dojo/query","dojo/dom"],function(e,a,t,i,s,o,r,n,l,c,d,p,u,g,h,y,b,v,f,k,L,S,w,x,C,M){function R(e){$("#calculateStats").button("reset");var a=e.results[0].value.features[0].attributes,t=$("#zonalStatsTable");t.html("<tr><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),t.append("<tr><td>"+a.MEAN.toFixed(4)+"</td><td>"+a.STD.toFixed(3)+"</td><td>"+a.MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")}var D,I,T,A,z,O=[],B=!1,E=!1,F=!1,G=!1,j={inputPoly:null},V=[];const H="http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/",N=new o("http://gis.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),U=new g(H+"CRSRA/MapServer",{id:"normalized",visible:!0});U.setVisibleLayers([4]),mapLayers.push(U),mapLayerIds.push(U.id),O.push({layer:U,title:" "}),U.inLegendLayers=!0;const q=new g(H+"CRSRA/MapServer",{id:"dikes",visible:!1,minScale:2e7});q.setVisibleLayers([16]),mapLayers.push(q),mapLayerIds.push(q.id),q.inLegendLayers=!1;const W=new g(H+"CRSRA/MapServer",{id:"degFlowlines",visible:!1,minScale:2e6});W.setVisibleLayers([15]),mapLayers.push(W),mapLayerIds.push(W.id),W.inLegendLayers=!1;const _=new g(H+"CRSRA/MapServer",{id:"culverts",visible:!1,minScale:2e6});_.setVisibleLayers([14]),mapLayers.push(_),mapLayerIds.push(_.id),_.inLegendLayers=!1,map.disableClickRecenter(),D=new d(map);var X=$("#drawCustom");X.click(function(){parcelsFeatLayer.clearSelection(),map.graphics.remove(A),map.graphics.remove(z),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),j={inputPoly:null},F?(D.finishDrawing(),D.deactivate(),X.removeClass("active"),X.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1):F||(X.addClass("active"),X.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),B=!1,D.activate(d.POLYGON),F=!0)});var Z=$("#selectParcels");Z.click(function(){X.removeClass("active"),X.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1,D.deactivate(),B?(Z.removeClass("active"),Z.html('<span class="ti-plus"></span>&nbsp;&nbsp;Click'),map.setMapCursor("auto"),B=!1):B||(Z.addClass("active"),Z.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop selecting'),map.setMapCursor("crosshair"),E=!1,B=!0)}),$("#clearSelection").click(function(){parcelsFeatLayer.clearSelection(),map.graphics.remove(A),map.graphics.remove(z),$("#displayStats").prop("disabled",!0),$("#calculateStats").prop("disabled",!0),j={inputPoly:null},V=[]}),zonalStatsGP=new i("http://gis.wim.usgs.gov/arcgis/rest/services/GLCWRA/CRSRAZonalStats/GPServer/CRSRAZonalStats"),zonalStatsGP.setOutputSpatialReference({wkid:102100}),zonalStatsGP.on("execute-complete",R),$("#calculateStats").click(function(){$(this).button("loading"),zonalStatsGP.execute(j)}),P(D,"DrawEnd",function(e){T=new v(v.STYLE_SOLID,new f(f.STYLE_SOLID,new L([255,0,0]),2),new L([255,255,0,.5])),A=new m(e,T),map.graphics.add(A),D.deactivate(),X.removeClass("active"),X.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),F=!1,V.push(A);var a=new s;a.features=V,j={inputPoly:a},$("#calculateStats").prop("disabled",!1)}),I=new d(map);var J=$("#selectParcelsDraw");J.click(function(){map.graphics.remove(z);var e=map.getScale(),a=map.getLayer("parcelsFeat").minScale;G?(I.finishDrawing(),I.deactivate(),J.removeClass("active"),J.html('<span class="ti-pencil-alt2"></span>&nbsp;Draw'),G=!1):G||(e>a?$("#parcelSelectScaleAlert").show():(J.addClass("active"),J.html('<i class="fa fa-stop"></i>&nbsp;&nbsp;Stop drawing'),B=!1,I.activate(d.POLYGON),G=!0))}),$("#displayStats").click(function(){$("#zonalStatsTable").html("<tr><th>Parcel ID</th><th>Hectares</th><th>Mean </th><th>Standard Deviation</th><th>Max</th></tr>"),map.getLayer("parcelsFeat").getSelectedFeatures().length>0&&$.each(map.getLayer("parcelsFeat").getSelectedFeatures(),function(){$("#zonalStatsTable").append("<tr><td>"+this.attributes.P_ID+"</td><td>"+this.attributes.Hec.toFixed(3)+"</td><td>"+this.attributes.MEAN.toFixed(4)+"</td><td>"+this.attributes.STD.toFixed(3)+"</td><td>"+this.attributes.stat_MAX+"</td></tr>"),$("#zonalStatsModal").modal("show")})});const K=new g(H+"CRSRA/MapServer",{id:"studyArea",visible:!0});K.setVisibleLayers([0]),mapLayers.push(K),mapLayerIds.push(K.id),O.push({layer:K,title:" "}),K.inLegendLayers=!0;const Q=new g(H+"CRSRA/MapServer",{id:"GLRIWetlands",visible:!0,minScale:1e5,maxScale:1e4});Q.setVisibleLayers([3]),mapLayers.push(Q),O.push({layer:Q,title:" "}),Q.inLegendLayers=!0;const ee=new g(H+"CRSRA/MapServer",{id:"stations",visible:!1});ee.setVisibleLayers([2]),mapLayers.push(ee),O.push({layer:ee,title:" "}),ee.inLegendLayers=!0;var ae=new x;ae.setTitle("Wetland Biological Integrity"),ae.setContent("<div style='text-align: left'><b>Wetland:</b>  ${name}<br/><b>Wetland class:</b> ${class}<br/><b>Veg IBI value:</b> ${VegIBI}<br/>More information available from the Great Lakes Coastal Wetlands Monitoring Program: <a href='http://greatlakeswetlands.org' target='_blank'>greatlakeswetlands.org</a></div>");var te=new h("https://services5.arcgis.com/ed839pyDNWVlk9KK/ArcGIS/rest/services/CWMP_Vegetation_IBI/FeatureServer/0",{id:"veg",layerID:"veg",visible:!1,mode:h.MODE_ONDEMAND,outFields:["*"],infoTemplate:ae});te.id="veg",mapLayers.push(te),mapLayerIds.push(te.id),O.push({layer:te,title:"Veg IBI Value"}),te.inLegendLayers=!0;var ie=new w({title:"U.S. ACOE Aerial Photo",mediaInfos:[{title:"",caption:"Date & Time taken: {date}",type:"image",value:{sourceURL:"{imageUrl}",linkURL:"{imageUrl}"}}]}),se=new h(H+"CRSRA/MapServer/1",{id:"aerials",layerID:"aerials",visible:!1,minScale:1e5,mode:h.MODE_ONDEMAND,outFields:["*"],infoTemplate:ie});se.id="aerials",mapLayers.push(se),mapLayerIds.push(se.id),O.push({layer:se,title:"US Army Corps of Engineers Aerial Photos "}),se.inLegendLayers=!0;const oe=new g(H+"CRSRA/MapServer",{id:"landuse",visible:!1});oe.setVisibleLayers([12]),mapLayers.push(oe),mapLayerIds.push(oe.id),oe.inLegendLayers=!1;const re=new g(H+"CRSRA/MapServer",{id:"imperviousSurfaces",visible:!1});re.setVisibleLayers([11]),mapLayers.push(re),mapLayerIds.push(re.id),re.inLegendLayers=!1;const ne=new g(H+"CRSRA/MapServer",{id:"conservedLands",visible:!1});ne.setVisibleLayers([10]),mapLayers.push(ne),mapLayerIds.push(ne.id),ne.inLegendLayers=!1;const le=new g(H+"CRSRA/MapServer",{id:"flowline",visible:!1});le.setVisibleLayers([9]),mapLayers.push(le),mapLayerIds.push(le.id),le.inLegendLayers=!1;const ce=new g(H+"CRSRA/MapServer",{id:"wetsoils",visible:!1});ce.setVisibleLayers([8]),mapLayers.push(ce),mapLayerIds.push(ce.id),ce.inLegendLayers=!1;const de=new g(H+"CRSRA/MapServer",{id:"hydroperiod",visible:!1});de.setVisibleLayers([7]),mapLayers.push(de),mapLayerIds.push(de.id),de.inLegendLayers=!1;const me=new g(H+"CRSRA/MapServer",{id:"waterMask",visible:!0,opacity:.75});me.setVisibleLayers([6]),mapLayers.push(me),mapLayerIds.push(me.id),me.inLegendLayers=!1,O.push({layer:me,title:""}),map.addLayers(mapLayers);var pe=new r,ue=new p(26917);Y.on("measure-end",function(e){pe.geometries=[e.geometry],pe.outSR=ue;var a=-1*e.geometry.x;84>a&&a>78?N.project(pe,function(e){var a=e[0];console.log(a);var t=a.x.toFixed(0),i=a.y.toFixed(0);$("#utmX").html(t),$("#utmY").html(i)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))});for(var ge=0;ge<map.layerIds.length;ge++){var he=map.getLayer(map.layerIds[ge]);he.visible&&($("#"+he.id).button("toggle"),$("#"+he.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}for(var ge=0;ge<map.graphicsLayerIds.length;ge++){var he=map.getLayer(map.graphicsLayerIds[ge]);he.visible&&($("#"+he.id).button("toggle"),$("#"+he.id).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"))}$("button.lyrTog").click(function(e){$(this).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$(this).button("toggle"),e.preventDefault(),e.stopPropagation();var a=map.getLayer($(this).attr("id"));a.visible?a.setVisibility(!1):(a.setVisibility(!0),a.inLegendLayers===!1&&(O.push({layer:a,title:" "}),a.inLegendLayers=!0,ye.refresh()))}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("hide.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down");var a=$(this).attr("id")+"Buttons";$("#"+a).button("toggle")}),$("#hydroConditionGroup, #parametersGroup, #4scaleGroup").on("show.bs.collapse",function(){var e=$(this)[0].id.replace("Group","");$("#"+e).find("i.checkBoxIcon").toggleClass("fa-check-square-o fa-square-o"),$("#"+e).find("i.chevron").toggleClass("fa-chevron-right fa-chevron-down")}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var a=this.id.replace("zoom",""),t=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(t),$(".zoomDialog").css("left",e.clientX-80),$(".zoomDialog").css("top",e.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var t=map.getLayer(a).minScale;t>0?map.setScale(t):console.log("No minimum scale for layer.")}),$("#zoomcenter").click(function(e){var a=new c(crsra.globals.mapCenter,new p({wkid:4326}));map.centerAt(a)}),$("#zoomextent").click(function(e){var t=map.getLayer(a).fullExtent,i=new r;i.outSR=new p(102100),i.geometries=[t],N.project(i,function(e){var a=e[0];map.setExtent(a,new p({wkid:102100}))})})}),$(".opacity").hover(function(e){$(".opacitySlider").remove();var a=this.id.replace("opacity",""),t=map.getLayer(a).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+t+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i);var s=$("#slider");s[0].value=100*t,$(".opacitySlider").css("left",e.clientX-180),$(".opacitySlider").css("top",e.clientY-5),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),s.change(function(e){var t=s[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(a).setOpacity(t)})});var ye=new e({map:map,layerInfos:O},"legendDiv");ye.startup()})});