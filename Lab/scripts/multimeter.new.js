"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function redraw_amp(){for(var t=0;t<ampermeter.length;t++){var e=ampermeter[t].getContext("2d"),r=ampermeter[t].current,a=ampermeter[t].max,o=260,i=140,n=20,h=5;e.clearRect(0,0,300,150),e.beginPath(),e.moveTo(n,h),e.lineTo(n+o,h),e.lineTo(n+o,h+i),e.lineTo(n,h+i),e.lineTo(n,h),e.stroke();var s=o/2+n,l=i/2+h+40,m=0;e.font="10px sans-serif";for(var c=0,v=0;v<=a/10;v+=a/200){Math.round(v);m=(160-10*v/a*160+10)/180*Math.PI,e.moveTo(s+70*Math.cos(m),l-70*Math.sin(m)),c%2==0?(e.lineTo(s+85*Math.cos(m),l-85*Math.sin(m)),e.fillText(Math.round(10*v),s-3+90*Math.cos(m),l-90*Math.sin(m))):e.lineTo(s+80*Math.cos(m),l-80*Math.sin(m)),c++}e.moveTo(s,l),m=(160-r/a*160+10)/180*Math.PI;var M=70;e.lineTo(s+M*Math.cos(m),l-M*Math.sin(m)),e.stroke(),e.font="20px monospace",e.fillText(ampermeter[t].label,s-10,l-20)}}function redraw_volt(){for(var t=0;t<voltmeter.length;t++){var e=voltmeter[t].getContext("2d"),r=voltmeter[t].voltage,a=voltmeter[t].max,o=260,i=140,n=20,h=5;e.clearRect(0,0,300,150),e.beginPath(),e.moveTo(n,h),e.lineTo(n+o,h),e.lineTo(n+o,h+i),e.lineTo(n,h+i),e.lineTo(n,h),e.stroke();var s=o/2+n,l=i/2+h+40,m=0;e.font="10px sans-serif";for(var c=0,v=0;v<=a/10;v+=a/200){Math.round(v);m=(160-10*v/a*160+10)/180*Math.PI,e.moveTo(s+60*Math.cos(m),l-60*Math.sin(m)),c%2==0?(e.lineTo(s+75*Math.cos(m),l-75*Math.sin(m)),e.fillText(Math.round(10*v),s-4+80*Math.cos(m),l-80*Math.sin(m))):e.lineTo(s+70*Math.cos(m),l-70*Math.sin(m)),c++}e.moveTo(s,l),m=(160-160*r/a+10)/180*Math.PI;var M=70;e.lineTo(s+M*Math.cos(m),l-M*Math.sin(m)),e.stroke(),e.font="20px monospace",e.fillText("V",s-5,l-20)}}function redraw_barom(){for(var t=0;t<barometr.length;t++){var e=barometr[t].getContext("2d"),r=barometr[t].preassure,a=barometr[t].max,o=260,i=140,n=20,h=5,s=document.createElement("img");s.src="/img/multimeter/barom.png",e.clearRect(0,0,300,150),e.drawImage(s,75,0,150,150);var l=o/2+n,m=i/2+h-16,c=0;e.beginPath(),e.moveTo(l,m),c=(270-r/a*270-46)/180*Math.PI;var v=48;e.lineTo(l+v*Math.cos(c),m-v*Math.sin(c)),e.stroke()}}for(var _createClass=(function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,r,a){return r&&t(e.prototype,r),a&&t(e,a),e}}()),ampermeter=document.querySelectorAll(".ampermeter"),i=0;i<ampermeter.length;i++)ampermeter[i].current=0,ampermeter[i].max=100,ampermeter[i].min=0,ampermeter[i].label="mA";redraw_amp();for(var voltmeter=document.querySelectorAll(".voltmeter"),i=0;i<voltmeter.length;i++)voltmeter[i].voltage=0,voltmeter[i].max=100,voltmeter[i].min=0;redraw_volt();for(var barometr=document.querySelectorAll(".barometr"),i=0;i<barometr.length;i++)barometr[i].preassure=0,barometr[i].max=1,barometr[i].min=0;redraw_barom();var Multimeter=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0],r=arguments.length<=1||void 0===arguments[1]?100:arguments[1],a=arguments.length<=2||void 0===arguments[2]?"V":arguments[2];_classCallCheck(this,t),this.canvas=e,this.value=0,this.max=r,this.min=0,this.metric=a,this.width=300,this.height=150,this._w=this.width-40,this._h=this.height-10,this._l=(this.width-this._w)/2,this._t=(this.height-this._h)/2,this.rds=70}return _createClass(t,[{key:"redraw",value:function(){var t=this.canvas.getContext("2d"),e=this.value,r=this.max,a=this._l,o=this._h,i=this._t,n=this.rds,h=this._w;t.clearRect(0,0,this.width,this.height),t.beginPath(),t.moveTo(a,i),t.lineTo(a+h,i),t.lineTo(a+h,i+o),t.lineTo(a,i+o),t.lineTo(a,i),t.stroke();var s=this._w/2+a,l=this._h/2+this._t+40,m=0;t.font="10px monospace";for(var c=0,v=0;v<=20;v++){var M=v;if(m=(160-160*M/20+10)/180*Math.PI,t.moveTo(s+60*Math.cos(m),l-60*Math.sin(m)),c%2==0){t.lineTo(s+75*Math.cos(m),l-75*Math.sin(m));var u=Math.round(M*r/20*10)/10,f=3*u.toString().length;t.fillText(u,s-f+85*Math.cos(m),l-85*Math.sin(m))}else t.lineTo(s+70*Math.cos(m),l-70*Math.sin(m));c++}t.moveTo(s,l),m=(160-160*e/r+10)/180*Math.PI,t.lineTo(s+n*Math.cos(m),l-n*Math.sin(m)),t.stroke(),t.font="20px monospace";var T=5*this.metric.length;t.fillText(this.metric,s-T,l-20)}},{key:"val",set:function(t){this.value=t,this.redraw()}}]),t}();