/*
 Highcharts JS v6.0.0 (2017-10-04)
 Boost module

 (c) 2010-2017 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(t){"object"===typeof module&&module.exports?module.exports=t:t(Highcharts)})(function(t){(function(l){function t(){var a=Array.prototype.slice.call(arguments),c=-Number.MAX_VALUE;K(a,function(a){if("undefined"!==typeof a&&"undefined"!==typeof a.length&&0<a.length)return c=a.length,!0});return c}function L(a){var c=0,e=0,f=!0,b;if("undefined"!==typeof a.boostForceChartBoost)return a.boostForceChartBoost;f=a.options.boost?"undefined"!==typeof a.options.boost.allowForce?a.options.boost.allowForce:
f:f;if(1<a.series.length)for(var m=0;m<a.series.length;m++)b=a.series[m],P[b.type]&&++e,t(b.processedXData,b.options.data,b.points)>=(b.options.boostThreshold||Number.MAX_VALUE)&&++c;a.boostForceChartBoost=f&&e===a.series.length&&0<c||5<c;return a.boostForceChartBoost}function A(a){return(a.options.boost&&"undefined"!==typeof a.options.boost.seriesThreshold?a.options.boost.seriesThreshold:50)<=a.series.length||L(a)}function E(a,c){return A(a.chart)||t(a.processedXData,a.options.data,a.points)>=(c||
a.options.boostThreshold||Number.MAX_VALUE)}function ia(a){function c(b,d){d=a.createShader("vertex"===d?a.VERTEX_SHADER:a.FRAGMENT_SHADER);a.shaderSource(d,b);a.compileShader(d);return a.getShaderParameter(d,a.COMPILE_STATUS)?d:!1}function e(){function b(b){return a.getUniformLocation(m,b)}var e=c("#version 100\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float plotHeight;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value \x3d aVertexPosition.w;\nfloat zMax \x3d bubbleZMax;\nfloat zMin \x3d bubbleZMin;\nfloat radius \x3d 0.0;\nfloat pos \x3d 0.0;\nfloat zRange \x3d zMax - zMin;\nif (bubbleSizeAbs){\nvalue \x3d value - bubbleZThreshold;\nzMax \x3d max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin \x3d 0.0;\n}\nif (value \x3c zMin){\nradius \x3d bubbleZMin / 2.0 - 1.0;\n} else {\npos \x3d zRange \x3e 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea \x26\x26 pos \x3e 0.0){\npos \x3d sqrt(pos);\n}\nradius \x3d ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord\n){\nfloat sign \x3d 1.0;\nfloat cvsOffset \x3d 0.0;\nif (cvsCoord) {\nsign *\x3d -1.0;\ncvsOffset \x3d len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value){\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold){\nfloat v;\nif (skipTranslation){\nv \x3d value;// + yAxisPos;\n} else {\nv \x3d translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord);// + yAxisPos;\nif (v \x3e plotHeight) {\nv \x3d plotHeight;\n}\n}\nif (checkTreshold \x3e 0.0 \x26\x26 hasThreshold) {\nv \x3d min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize \x3d bubbleRadius();\n} else {\ngl_PointSize \x3d pSize;\n}\nvColor \x3d aColor;\nif (isInverted) {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.y) + yAxisPos, yToPixels(aVertexPosition.x, aVertexPosition.z) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
"vertex"),f=c("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col \x3d fillColor;\nvec4 tcol;\nif (hasColor) {\ncol \x3d vColor;\n}\nif (isCircle) {\ntcol \x3d texture2D(uSampler, gl_PointCoord.st);\ncol *\x3d tcol;\nif (tcol.r \x3c 0.0) {\ndiscard;\n} else {\ngl_FragColor \x3d col;\n}\n} else {\ngl_FragColor \x3d col;\n}\n}","fragment");
if(!e||!f)return m=!1;m=a.createProgram();a.attachShader(m,e);a.attachShader(m,f);a.linkProgram(m);a.useProgram(m);a.bindAttribLocation(m,0,"aVertexPosition");l=b("uPMatrix");n=b("pSize");g=b("fillColor");Q=b("isBubble");h=b("bubbleSizeAbs");B=b("bubbleSizeByArea");F=b("uSampler");d=b("skipTranslation");y=b("isCircle");k=b("isInverted");G=b("plotHeight");return!0}function f(d,c){d=b[d]=b[d]||a.getUniformLocation(m,d);a.uniform1f(d,c)}var b={},m,l,n,g,Q,h,B,d,y,k,G,F;a&&e();return{psUniform:function(){return n},
pUniform:function(){return l},fillColorUniform:function(){return g},setPlotHeight:function(b){a.uniform1f(G,b)},setBubbleUniforms:function(b,d,c){var e=b.options,m=Number.MAX_VALUE,l=-Number.MAX_VALUE;"bubble"===b.type&&(m=R(e.zMin,Math.min(m,Math.max(d,!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),l=R(e.zMax,Math.max(l,c)),a.uniform1i(Q,1),a.uniform1i(y,1),a.uniform1i(B,"width"!==b.options.sizeBy),a.uniform1i(h,b.options.sizeByAbsoluteValue),f("bubbleZMin",m),f("bubbleZMax",l),f("bubbleZThreshold",
b.options.zThreshold),f("bubbleMinSize",b.minPxSize),f("bubbleMaxSize",b.maxPxSize))},bind:function(){a.useProgram(m)},program:function(){return m},create:e,setUniform:f,setPMatrix:function(b){a.uniformMatrix4fv(l,!1,b)},setColor:function(b){a.uniform4f(g,b[0]/255,b[1]/255,b[2]/255,b[3])},setPointSize:function(b){a.uniform1f(n,b)},setSkipTranslation:function(b){a.uniform1i(d,!0===b?1:0)},setTexture:function(){a.uniform1i(F,0)},setDrawAsCircle:function(b){a.uniform1i(y,b?1:0)},reset:function(){a.uniform1i(Q,
0);a.uniform1i(y,0)},setInverted:function(b){a.uniform1i(k,b)},destroy:function(){a&&m&&(a.deleteProgram(m),m=!1)}}}function aa(a,c,e){function f(){b&&(a.deleteBuffer(b),m=b=!1);g=0;l=e||2;k=[]}var b=!1,m=!1,l=e||2,n=!1,g=0,k;return{destroy:f,bind:function(){if(!b)return!1;a.vertexAttribPointer(m,l,a.FLOAT,!1,0,0)},data:k,build:function(e,g,d){var h;k=e||[];if(!(k&&0!==k.length||n))return f(),!1;l=d||l;b&&a.deleteBuffer(b);n||(h=new Float32Array(k));b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,
b);a.bufferData(a.ARRAY_BUFFER,n||h,a.STATIC_DRAW);m=a.getAttribLocation(c.program(),g);a.enableVertexAttribArray(m);return!0},render:function(c,e,d){var f=n?n.length:k.length;if(!b||!f)return!1;if(!c||c>f||0>c)c=0;if(!e||e>f)e=f;a.drawArrays(a[(d||"points").toUpperCase()],c/l,(e-c)/l);return!0},allocate:function(a){g=-1;n=new Float32Array(4*a)},push:function(a,b,d,c){n&&(n[++g]=a,n[++g]=b,n[++g]=d,n[++g]=c)}}}function ja(a){function c(a){var b,d;return E(a)?(b=!!a.options.stacking,d=a.xData||a.options.xData||
a.processedXData,b=(b?a.data:d||a.options.data).length,"treemap"===a.type?b*=12:"heatmap"===a.type?b*=6:V[a.type]&&(b*=2),b):0}function e(){d.clear(d.COLOR_BUFFER_BIT|d.DEPTH_BUFFER_BIT)}function f(a,b){function d(a){a&&(b.colorData.push(a[0]),b.colorData.push(a[1]),b.colorData.push(a[2]),b.colorData.push(a[3]))}function c(a,b,c,e,f){d(f);p.usePreallocated?B.push(a,b,c?1:0,e||1):(G.push(a),G.push(b),G.push(c?1:0),G.push(e||1))}function e(a,b,e,f,q){d(q);c(a+e,b);d(q);c(a,b);d(q);c(a,b+f);d(q);c(a,
b+f);d(q);c(a+e,b+f);d(q);c(a+e,b)}function f(a){p.useGPUTranslations||(b.skipTranslation=!0,a.x=F.toPixels(a.x,!0),a.y=A.toPixels(a.y,!0));c(a.x,a.y,0,2)}var ka=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),h=a.chart,q=a.options,m=!!q.stacking,g=q.data,n=a.xAxis.getExtremes(),k=n.min,n=n.max,w=a.yAxis.getExtremes(),y=w.min,w=w.max,u=a.xData||q.xData||a.processedXData,z=a.yData||q.yData||a.processedYData,t=a.zData||q.zData||a.processedZData,A=a.yAxis,F=a.xAxis,E=a.chart.plotHeight,M=!u||
0===u.length,r=a.points||!1,D=!1,X=!1,x,S,T,g=m?a.data:u||g,u={x:Number.MIN_VALUE,y:0},J={x:Number.MIN_VALUE,y:0},U=0,v,I,C=-1,Q=!1,H=!1,N="undefined"===typeof h.index,R=!1,O=!1,W=V[a.type],L=!1,P=!0;if(!(q.boostData&&0<q.boostData.length))if(a.closestPointRangePx=Number.MAX_VALUE,r&&0<r.length)b.skipTranslation=!0,b.drawMode="triangles",r[0].node&&r[0].node.levelDynamic&&r.sort(function(a,b){if(a.node){if(a.node.levelDynamic>b.node.levelDynamic)return 1;if(a.node.levelDynamic<b.node.levelDynamic)return-1}return 0}),
K(r,function(b){var d=b.plotY,c;"undefined"===typeof d||isNaN(d)||null===b.y||(d=b.shapeArgs,c=b.series.pointAttribs(b),b=c["stroke-width"]||0,S=l.color(c.fill).rgba,S[0]/=255,S[1]/=255,S[2]/=255,"treemap"===a.type&&(b=b||1,T=l.color(c.stroke).rgba,T[0]/=255,T[1]/=255,T[2]/=255,e(d.x,d.y,d.width,d.height,T),b/=2),"heatmap"===a.type&&h.inverted&&(d.x=F.len-d.x,d.y=A.len-d.y,d.width=-d.width,d.height=-d.height),e(d.x+b,d.y+b,d.width-2*b,d.height-2*b,S))});else{for(;C<g.length-1;){x=g[++C];if(N)break;
M?(r=x[0],v=x[1],g[C+1]&&(H=g[C+1][0]),g[C-1]&&(Q=g[C-1][0]),3<=x.length&&(I=x[2],x[2]>b.zMax&&(b.zMax=x[2]),x[2]<b.zMin&&(b.zMin=x[2]))):(r=x,v=z[C],g[C+1]&&(H=g[C+1]),g[C-1]&&(Q=g[C-1]),t&&t.length&&(I=t[C],t[C]>b.zMax&&(b.zMax=t[C]),t[C]<b.zMin&&(b.zMin=t[C])));H&&H>=k&&H<=n&&(R=!0);Q&&Q>=k&&Q<=n&&(O=!0);ka?(M&&(v=x.slice(1,3)),v=v[1]):m&&(r=x.x,v=x.stackY);a.requireSorting||(P=v>=y&&v<=w);r>n&&J.x<n&&(J.x=r,J.y=v);r<k&&u.x<k&&(u.x=r,u.y=v);if(0===v||v&&P)if(r>=k&&r<=n&&(L=!0),L||R||O)p.useGPUTranslations||
(b.skipTranslation=!0,r=F.toPixels(r,!0),v=A.toPixels(v,!0),v>E&&(v=E)),W&&(x=0,0>v&&(x=v,v=0),p.useGPUTranslations||(x=A.toPixels(x,!0)),c(r,x,0,0,!1)),b.hasMarkers&&!1!==D&&(a.closestPointRangePx=Math.min(a.closestPointRangePx,Math.abs(r-D))),!p.useGPUTranslations&&!p.usePreallocated&&D&&1>r-D&&X&&1>Math.abs(v-X)?p.debug.showSkipSummary&&++U:(q.step&&c(r,X,0,2,!1),c(r,v,0,"bubble"===a.type?I||1:2,!1),D=r,X=v)}p.debug.showSkipSummary&&console.log("skipped points:",U);D||(f(u),f(J))}}function b(){w=
[];t.data=G=[];F=[];B&&B.destroy()}function m(a){h&&(h.setUniform("xAxisTrans",a.transA),h.setUniform("xAxisMin",a.min),h.setUniform("xAxisMinPad",a.minPixelPadding),h.setUniform("xAxisPointRange",a.pointRange),h.setUniform("xAxisLen",a.len),h.setUniform("xAxisPos",a.pos),h.setUniform("xAxisCVSCoord",!a.horiz))}function g(a){h&&(h.setUniform("yAxisTrans",a.transA),h.setUniform("yAxisMin",a.min),h.setUniform("yAxisMinPad",a.minPixelPadding),h.setUniform("yAxisPointRange",a.pointRange),h.setUniform("yAxisLen",
a.len),h.setUniform("yAxisPos",a.pos),h.setUniform("yAxisCVSCoord",!a.horiz))}function n(a,b){h.setUniform("hasThreshold",a);h.setUniform("translatedThreshold",b)}function k(c){if(c)y=c.chartWidth||800,M=c.chartHeight||400;else return!1;if(!d||!y||!M)return!1;p.debug.timeRendering&&console.time("gl rendering");d.canvas.width=y;d.canvas.height=M;h.bind();d.viewport(0,0,y,M);h.setPMatrix([2/y,0,0,0,0,-(2/M),0,0,0,0,-2,0,-1,1,-1,1]);h.setPlotHeight(c.plotHeight);1<p.lineWidth&&!l.isMS&&d.lineWidth(p.lineWidth);
B.build(t.data,"aVertexPosition",4);B.bind();z&&(d.bindTexture(d.TEXTURE_2D,D),h.setTexture(D));h.setInverted(c.inverted);K(w,function(a,b){var c=a.series.options,e=c.threshold,f=H(e),e=a.series.yAxis.getThreshold(e),q=R(c.marker?c.marker.enabled:null,a.series.xAxis.isRadial?!0:null,a.series.closestPointRangePx>2*((c.marker?c.marker.radius:10)||10)),k=a.series.pointAttribs&&a.series.pointAttribs().fill||a.series.color;a.series.fillOpacity&&c.fillOpacity&&(k=(new ba(k)).setOpacity(R(c.fillOpacity,
1)).get());c.colorByPoint&&(k=a.series.chart.options.colors[b]);k=l.color(k).rgba;p.useAlpha||(k[3]=1);"lines"===a.drawMode&&p.useAlpha&&1>k[3]&&(k[3]/=10);"add"===c.boostBlending?(d.blendFunc(d.SRC_ALPHA,d.ONE),d.blendEquation(d.FUNC_ADD)):"mult"===c.boostBlending?d.blendFunc(d.DST_COLOR,d.ZERO):"darken"===c.boostBlending?(d.blendFunc(d.ONE,d.ONE),d.blendEquation(d.FUNC_MIN)):d.blendFuncSeparate(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.ONE,d.ONE_MINUS_SRC_ALPHA);h.reset();0<a.colorData.length&&(h.setUniform("hasColor",
1),b=aa(d,h),b.build(a.colorData,"aColor",4),b.bind());h.setColor(k);m(a.series.xAxis);g(a.series.yAxis);n(f,e);"points"===a.drawMode&&(c.marker&&c.marker.radius?h.setPointSize(2*c.marker.radius):h.setPointSize(1));h.setSkipTranslation(a.skipTranslation);"bubble"===a.series.type&&h.setBubbleUniforms(a.series,a.zMin,a.zMax);h.setDrawAsCircle(I[a.series.type]&&z||!1);B.render(a.from,a.to,a.drawMode);a.hasMarkers&&q&&(c.marker&&c.marker.radius?h.setPointSize(2*c.marker.radius):h.setPointSize(10),h.setDrawAsCircle(!0),
B.render(a.from,a.to,"POINTS"))});p.debug.timeRendering&&console.timeEnd("gl rendering");a&&a();b()}function A(a){e();if(a.renderer.forExport)return k(a);U?k(a):setTimeout(function(){A(a)},1)}var h=!1,B=!1,d=!1,y=0,M=0,G=!1,F=!1,z=!1,t={},U=!1,w=[],J=N.createElement("canvas"),u=J.getContext("2d"),D,V={column:!0,bar:!0,area:!0},I={scatter:!0,bubble:!0},p={pointSize:1,lineWidth:1,fillColor:"#AA00AA",useAlpha:!0,usePreallocated:!1,useGPUTranslations:!1,debug:{timeRendering:!1,timeSeriesProcessing:!1,
timeSetup:!1,timeBufferCopy:!1,timeKDTree:!1,showSkipSummary:!1}};return t={allocateBufferForSingleSeries:function(a){var b=0;p.usePreallocated&&(E(a)&&(b=c(a)),B.allocate(b))},pushSeries:function(a){0<w.length&&(w[w.length-1].to=G.length,w[w.length-1].hasMarkers&&(w[w.length-1].markerTo=F.length));p.debug.timeSeriesProcessing&&console.time("building "+a.type+" series");w.push({from:G.length,markerFrom:F.length,colorData:[],series:a,zMin:Number.MAX_VALUE,zMax:-Number.MAX_VALUE,hasMarkers:a.options.marker?
!1!==a.options.marker.enabled:!1,showMarksers:!0,drawMode:{area:"lines",arearange:"lines",areaspline:"line_strip",column:"lines",bar:"lines",line:"line_strip",scatter:"points",heatmap:"triangles",treemap:"triangles",bubble:"points"}[a.type]||"line_strip"});f(a,w[w.length-1]);p.debug.timeSeriesProcessing&&console.timeEnd("building "+a.type+" series")},setSize:function(a,b){if(y!==a||b!==b)y=a,M=b,h.bind(),h.setPMatrix([2/y,0,0,0,0,-(2/M),0,0,0,0,-2,0,-1,1,-1,1])},inited:function(){return U},setThreshold:n,
init:function(a,c){var e=0,f=["webgl","experimental-webgl","moz-webgl","webkit-3d"];U=!1;if(!a)return!1;for(p.debug.timeSetup&&console.time("gl setup");e<f.length&&!(d=a.getContext(f[e],{}));e++);if(d)c||b();else return!1;d.enable(d.BLEND);d.blendFunc(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA);d.disable(d.DEPTH_TEST);d.depthFunc(d.LESS);h=ia(d);B=aa(d,h);z=!1;D=d.createTexture();J.width=512;J.height=512;u.mozImageSmoothingEnabled=!1;u.webkitImageSmoothingEnabled=!1;u.msImageSmoothingEnabled=!1;u.imageSmoothingEnabled=
!1;u.strokeStyle="rgba(255, 255, 255, 0)";u.fillStyle="#FFF";u.beginPath();u.arc(256,256,256,0,2*Math.PI);u.stroke();u.fill();try{d.bindTexture(d.TEXTURE_2D,D),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,d.RGBA,d.UNSIGNED_BYTE,J),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR),d.bindTexture(d.TEXTURE_2D,null),z=
!0}catch(Y){}U=!0;p.debug.timeSetup&&console.timeEnd("gl setup");return!0},render:A,settings:p,valid:function(){return!1!==d},clear:e,flush:b,setXAxis:m,setYAxis:g,data:G,gl:function(){return d},allocateBuffer:function(a){var b=0;p.usePreallocated&&(K(a.series,function(a){E(a)&&(b+=c(a))}),B.allocate(b))},destroy:function(){b();B.destroy();h.destroy();d&&(D&&d.deleteTexture(D),d.canvas.width=1,d.canvas.height=1)},setOptions:function(a){la(!0,p,a)}}}function ca(a,c){var e=a.chartWidth,f=a.chartHeight,
b=a,g=a.seriesGroup||c.group,k=N.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility","1.1"),b=A(a)?a:c,k=!1;b.renderTarget||(b.canvas=ma,a.renderer.forExport||!k?(b.renderTarget=a.renderer.image("",0,0,e,f).add(g),b.boostClear=function(){b.renderTarget.attr({href:""})},b.boostCopy=function(){b.boostResizeTarget();b.renderTarget.attr({href:b.canvas.toDataURL("image/png")})}):(b.renderTargetFo=a.renderer.createElement("foreignObject").add(g),b.renderTarget=N.createElement("canvas"),
b.renderTargetCtx=b.renderTarget.getContext("2d"),b.renderTargetFo.element.appendChild(b.renderTarget),b.boostClear=function(){b.renderTarget.width=b.canvas.width;b.renderTarget.height=b.canvas.height},b.boostCopy=function(){b.renderTarget.width=b.canvas.width;b.renderTarget.height=b.canvas.height;b.renderTargetCtx.drawImage(b.canvas,0,0)}),b.boostResizeTarget=function(){e=a.chartWidth;f=a.chartHeight;(b.renderTargetFo||b.renderTarget).attr({x:0,y:0,width:e,height:f,style:"pointer-events: none; mix-blend-mode: normal; opacity:1"});
b instanceof l.Chart&&b.markerGroup.translate(c.xAxis.pos,c.yAxis.pos)},b.boostClipRect=a.renderer.clipRect(a.plotLeft,a.plotTop,a.plotWidth,a.chartHeight),(b.renderTargetFo||b.renderTarget).clip(b.boostClipRect),b instanceof l.Chart&&(b.markerGroup=b.renderer.g().add(g),b.markerGroup.translate(c.xAxis.pos,c.yAxis.pos)));b.canvas.width=e;b.canvas.height=f;b.boostClipRect.attr({x:a.plotLeft,y:a.plotTop,width:a.plotWidth,height:a.chartHeight});b.boostResizeTarget();b.boostClear();b.ogl||(b.ogl=ja(function(){b.ogl.settings.debug.timeBufferCopy&&
console.time("buffer copy");b.boostCopy();b.ogl.settings.debug.timeBufferCopy&&console.timeEnd("buffer copy")}),b.ogl.init(b.canvas),b.ogl.setOptions(a.options.boost||{}),b instanceof l.Chart&&b.ogl.allocateBuffer(a));b.ogl.setSize(e,f);return b.ogl}function da(a,c,e){a&&c.renderTarget&&c.canvas&&!A(e||c.chart)&&a.render(e||c.chart)}function ea(a,c){a&&c.renderTarget&&c.canvas&&!A(c.chart)&&a.allocateBufferForSingleSeries(c)}function V(a,c,e,f,b,g){b=b||0;f=f||3E4;for(var k=b+f,m=!0;m&&b<k&&b<a.length;)m=
c(a[b],b),++b;m&&(b<a.length?g?V(a,c,e,f,b,g):I.requestAnimationFrame?I.requestAnimationFrame(function(){V(a,c,e,f,b)}):setTimeout(function(){V(a,c,e,f,b)}):e&&e())}function na(a){var c=!0;this.chart.options&&this.chart.options.boost&&(c="undefined"===typeof this.chart.options.boost.enabled?!0:this.chart.options.boost.enabled);if(!c||!E(this))return a.call(this);this.chart.isBoosting=!0;if(a=ca(this.chart,this))ea(a,this),a.pushSeries(this);da(a,this)}var I=l.win,N=I.document,oa=function(){},ba=l.Color,
z=l.Series,g=l.seriesTypes,K=l.each,fa=l.extend,ga=l.addEvent,pa=l.fireEvent,qa=l.grep,H=l.isNumber,la=l.merge,R=l.pick,k=l.wrap,O=l.getOptions().plotOptions,ma=N.createElement("canvas"),W,ha="area arearange column bar line scatter heatmap bubble treemap".split(" "),P={};K(ha,function(a){P[a]=1});ba.prototype.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",
blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",feldspar:"#d19275",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",
lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslateblue:"#8470ff",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",
mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",
peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",
violetred:"#d02090",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};z.prototype.getPoint=function(a){var c=a,e=this.xData||this.options.xData||this.processedXData||!1;!a||a instanceof this.pointClass||(c=(new this.pointClass).init(this,this.options.data[a.i],e?e[a.i]:void 0),c.category=c.x,c.dist=a.dist,c.distX=a.distX,c.plotX=a.plotX,c.plotY=a.plotY,c.index=a.i);return c};k(z.prototype,"searchPoint",function(a){return this.getPoint(a.apply(this,[].slice.call(arguments,
1)))});k(z.prototype,"destroy",function(a){var c=this,e=c.chart;e.markerGroup===c.markerGroup&&(c.markerGroup=null);e.hoverPoints&&(e.hoverPoints=qa(e.hoverPoints,function(a){return a.series===c}));e.hoverPoint&&e.hoverPoint.series===c&&(e.hoverPoint=null);a.call(this)});k(z.prototype,"getExtremes",function(a){if(!E(this)||!this.hasExtremes||!this.hasExtremes())return a.apply(this,Array.prototype.slice.call(arguments,1))});K(ha,function(a){O[a]&&(O[a].boostThreshold=5E3,O[a].boostData=[],g[a].prototype.fillOpacity=
!0)});K(["translate","generatePoints","drawTracker","drawPoints","render"],function(a){function c(c){var e=this.options.stacking&&("translate"===a||"generatePoints"===a),b=!0;this.chart&&this.chart.options&&this.chart.options.boost&&(b="undefined"===typeof this.chart.options.boost.enabled?!0:this.chart.options.boost.enabled);if(!E(this)||e||!b||"heatmap"===this.type||"treemap"===this.type){"render"===a&&(this.stickyTracking=(this.options||{}).stickyTracking,this.boostClear&&(this.boostClear(),this.animate=
null));if(!this.options.stacking&&"translate"===a&&"treemap"!==this.type&&"heatmap"!==this.type&&(this.generatePoints(),E(this)))return;c.call(this)}else if(this[a+"Canvas"])this[a+"Canvas"]()}k(z.prototype,a,c);"translate"===a&&(g.column&&k(g.column.prototype,a,c),g.bar&&k(g.bar.prototype,a,c),g.arearange&&k(g.arearange.prototype,a,c),g.treemap&&k(g.treemap.prototype,a,c),g.heatmap&&k(g.heatmap.prototype,a,c))});(function(){var a=0,c,e=["webgl","experimental-webgl","moz-webgl","webkit-3d"],f=!1;
if("undefined"!==typeof I.WebGLRenderingContext)for(c=N.createElement("canvas");a<e.length;a++)try{if(f=c.getContext(e[a]),"undefined"!==typeof f&&null!==f)return!0}catch(b){}return!1})()?(k(z.prototype,"processData",function(a){E(this)&&"heatmap"!==this.type&&"treemap"!==this.type||a.apply(this,Array.prototype.slice.call(arguments,1));this.hasExtremes&&this.hasExtremes(!0)||a.apply(this,Array.prototype.slice.call(arguments,1))}),l.extend(z.prototype,{pointRange:0,directTouch:!1,allowDG:!1,hasExtremes:function(a){var c=
this.options,e=this.xAxis&&this.xAxis.options,f=this.yAxis&&this.yAxis.options;return c.data.length>(c.boostThreshold||Number.MAX_VALUE)&&H(f.min)&&H(f.max)&&(!a||H(e.min)&&H(e.max))},destroyGraphics:function(){var a=this,c=this.points,e,f;if(c)for(f=0;f<c.length;f+=1)(e=c[f])&&e.graphic&&(e.graphic=e.graphic.destroy());K(["graph","area","tracker"],function(b){a[b]&&(a[b]=a[b].destroy())})},renderCanvas:function(){function a(a,b){var c,e,f,h="undefined"===typeof g.index,m=!0;if(!h&&(N?(c=a[0],e=a[1]):
(c=a,e=z[b]),J?(N&&(e=a.slice(1,3)),f=e[0],e=e[1]):u&&(c=a.x,e=a.stackY,f=e-a.y),R||(m=e>=y&&e<=E),null!==e&&c>=B&&c<=d&&m))if(a=Math.ceil(k.toPixels(c,!0)),H){if(void 0===q||a===F){J||(f=e);if(void 0===L||e>O)O=e,L=b;if(void 0===q||f<p)p=f,q=b}a!==F&&(void 0!==q&&(e=l.toPixels(O,!0),w=l.toPixels(p,!0),Z(a,e,L),w!==e&&Z(a,w,q)),q=L=void 0,F=a)}else e=Math.ceil(l.toPixels(e,!0)),Z(a,e,b);return!h}function c(){pa(e,"renderedCanvas");e.directTouch=!1;e.options.stickyTracking=!0;delete e.buildKDTree;
e.buildKDTree();P.debug.timeKDTree&&console.timeEnd("kd tree building")}var e=this,f=e.options||{},b=!1,g=e.chart,k=this.xAxis,l=this.yAxis,t=f.xData||e.processedXData,z=f.yData||e.processedYData,h=f.data,b=k.getExtremes(),B=b.min,d=b.max,b=l.getExtremes(),y=b.min,E=b.max,G={},F,H=!!e.sampling,I,K=!1!==f.enableMouseTracking,w=l.getThreshold(f.threshold),J=e.pointArrayMap&&"low,high"===e.pointArrayMap.join(","),u=!!f.stacking,D=e.cropStart||0,R=e.requireSorting,N=!t,p,O,q,L,P,Y=this.xData||this.options.xData||
this.processedXData||!1,Z=function(a,b,c){W=a+","+b;K&&!G[W]&&(G[W]=!0,g.inverted&&(a=k.len-a,b=l.len-b),I.push({x:Y?Y[D+c]:!1,clientX:a,plotX:a,plotY:b,i:D+c}))},b=ca(g,e);g.isBoosting=!0;P=b.settings;this.stickyTracking=!0;if(this.visible){if(this.points||this.graph)this.animate=null,this.destroyGraphics();A(g)?this.markerGroup=g.markerGroup:this.markerGroup=e.plotGroup("markerGroup","markers",!0,1,g.seriesGroup);I=this.points=[];e.buildKDTree=oa;b&&(ea(b,this),b.pushSeries(e),da(b,this,g));g.renderer.forExport||
(P.debug.timeKDTree&&console.time("kd tree building"),V(u?e.data:t||h,a,c))}}}),K(["heatmap","treemap"],function(a){g[a]&&(k(g[a].prototype,"drawPoints",na),g[a].prototype.directTouch=!1)}),g.bubble&&(delete g.bubble.prototype.buildKDTree,g.bubble.prototype.directTouch=!1,k(g.bubble.prototype,"markerAttribs",function(a){return E(this)?!1:a.apply(this,[].slice.call(arguments,1))})),g.scatter.prototype.fill=!0,fa(g.area.prototype,{fill:!0,fillOpacity:!0,sampling:!0}),fa(g.column.prototype,{fill:!0,
sampling:!0}),k(z.prototype,"setVisible",function(a,c,e){a.call(this,c,e);!1===this.visible&&this.canvas&&this.renderTarget&&(this.ogl&&this.ogl.clear(),this.boostClear())}),l.Chart.prototype.callbacks.push(function(a){ga(a,"predraw",function(){a.boostForceChartBoost=void 0;a.boostForceChartBoost=L(a);a.isBoosting=!1;!A(a)&&a.didBoost&&(a.didBoost=!1);a.boostClear&&a.boostClear();a.canvas&&a.ogl&&A(a)&&(a.didBoost=!0,a.ogl.allocateBuffer(a));a.markerGroup&&a.xAxis&&0<a.xAxis.length&&a.yAxis&&0<a.yAxis.length&&
a.markerGroup.translate(a.xAxis[0].pos,a.yAxis[0].pos)});ga(a,"render",function(){a.ogl&&A(a)&&a.ogl.render(a)})})):"undefined"!==typeof l.initCanvasBoost?l.initCanvasBoost():l.error(26)})(t)});