(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{6067:function(e,n,t){"use strict";n.a=function(e){return{root:{},paper:{padding:2*e.spacing.unit},column:{maxWidth:"40em",marginLeft:"auto",marginRight:"auto"},verse:{margin:0},tabVerse:{margin:"".concat(2*e.spacing.unit,"px ").concat(0*e.spacing.unit,"px ").concat(0*e.spacing.unit,"px")},fullWidth:{width:"100%"},expansionPanelDetails:{padding:0},expansionPanelActions:{padding:0}}}},6374:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),i=t(20),s=t(32),c=t(41),l=t(49),o=t(50),u=t(52),p=t(51),d=t(53),g=t(6367),f=t(6368),h=function(e){var n=e.inputRef,t=Object(f.a)(e,["inputRef"]);return r.a.createElement("div",Object.assign({ref:n},t))},m={Control:function(e){return r.a.createElement(s.TextField,Object.assign({fullWidth:!0,InputProps:{inputComponent:h,inputProps:Object(c.a)({className:e.selectProps.classes.input,inputRef:e.innerRef,children:e.children},e.innerProps)}},e.selectProps.textFieldProps))},Menu:function(e){return r.a.createElement(s.Paper,Object.assign({square:!0,className:e.selectProps.classes.paper},e.innerProps),e.children)},NoOptionsMessage:function(e){return r.a.createElement(s.Typography,Object.assign({color:"textSecondary",className:e.selectProps.classes.noOptionsMessage},e.innerProps),e.children)},Option:function(e){return r.a.createElement(s.MenuItem,Object.assign({buttonRef:e.innerRef,selected:e.isFocused,component:"div",style:{fontWeight:e.isSelected?500:400}},e.innerProps),e.children)},Placeholder:function(e){return r.a.createElement(s.Typography,Object.assign({color:"textSecondary",className:e.selectProps.classes.placeholder},e.innerProps),e.children)},SingleValue:function(e){return r.a.createElement(s.Typography,Object.assign({className:e.selectProps.classes.singleValue},e.innerProps),e.children)},ValueContainer:function(e){return r.a.createElement("div",{className:e.selectProps.classes.valueContainer},e.children)}},b=t(55),v=function(e){return{root:{flexGrow:1},input:{display:"flex",padding:0},valueContainer:{display:"flex",flexWrap:"wrap",flex:1,alignItems:"center",overflow:"hidden"},chip:{margin:"".concat(e.spacing.unit/2,"px ").concat(e.spacing.unit/4,"px")},chipFocused:{backgroundColor:Object(b.emphasize)("light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],.08)},noOptionsMessage:{padding:"".concat(e.spacing.unit,"px ").concat(2*e.spacing.unit,"px")},singleValue:{fontSize:16},placeholder:{position:"absolute",left:2,fontSize:16},paper:{position:"absolute",zIndex:1,marginTop:e.spacing.unit,left:0,right:0},divider:{height:2*e.spacing.unit}}},x=[{value:"en",label:"en - English"},{value:"es-419",label:"es-419 - Spanish"},{value:"fr",label:"fr - French"},{value:"hi",label:"hi - Hindi"},{value:"pt-br",label:"pt-br - Brazilian Portuguese"}],y=function(e){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(t=Object(u.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).handleChange=function(e){return function(e){var n=JSON.parse(JSON.stringify(t.props.context));n.languageId=e.value,t.props.setContext(n)}},t}return Object(d.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){var e=this.props,n=e.classes,t=e.theme,a=e.context,i={input:function(e){return Object(c.a)({},e,{color:t.palette.text.primary,"& input":{font:"inherit"}})}};return r.a.createElement("div",{className:n.root},r.a.createElement(s.NoSsr,null,r.a.createElement(g.a,{classes:n,styles:i,options:x,components:m,value:x.filter(function(e){return e.value===a.languageId})[0],onChange:this.handleChange("language"),placeholder:"Select Language"}),r.a.createElement("div",{className:n.divider})))}}]),n}(r.a.Component),O=Object(i.withStyles)(v,{withTheme:!0})(y),P=t(6067),j=Object(a.lazy)(function(){return t.e(7).then(t.bind(null,6370))}),E=Object(i.withStyles)(P.a)(function(e){var n=e.classes,t=e.context,i=e.setContext,c=e.manifests,l=Object.keys(c).filter(function(e){var n,a=["ult","ust","ulb","udb","irv","obs"].includes(e),r=c[e];r&&(n=r.dublin_core.language.identifier);var i=n===t.languageId;return a&&r&&i}),o=r.a.createElement(s.CircularProgress,{className:n.progress,color:"secondary",disableShrink:!0});return r.a.createElement("div",{className:n.column},r.a.createElement(O,{context:t,setContext:i}),r.a.createElement(a.Suspense,{fallback:o},l.map(function(e){return r.a.createElement(j,{key:e,context:t,setContext:i,manifest:c[e]})})))});n.default=E}}]);
//# sourceMappingURL=4.16265450.chunk.js.map