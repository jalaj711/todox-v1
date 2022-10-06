(this.webpackJsonptodox=this.webpackJsonptodox||[]).push([[4],{174:function(e,t,a){"use strict";a.r(t);var s=a(24),n=a(37),i=a(38),r=a(33),c=a(40),l=a(39),o=a(0),d=a.n(o),p=a(5),u=a(267),h=a(251),m=a(78),b=a(253),k=a(197),g=a(254),f=a(136),E=a(50),v=a(252),w=a(255),y=a(256),D=a(198),N=function(e){Object(c.a)(o,e);var t=Object(l.a)(o);function o(e){var a;return Object(n.a)(this,o),(a=t.call(this,e)).state={isOpen:!1},a.toggleStar=a.toggleStar.bind(Object(r.a)(a)),a.toggleState=a.toggleState.bind(Object(r.a)(a)),a.markAsDone=a.markAsDone.bind(Object(r.a)(a)),a.handleDelete=a.handleDelete.bind(Object(r.a)(a)),a.task=a.props.task,a}return Object(i.a)(o,[{key:"markAsDone",value:function(){var e=this,t=function(){e.task.done=!0,e.task.status=2,window.database.update("tasks",e.task.id,e.task,(function(){e.props.unMount&&e.props.unMount()}))};window.database?t():a.e(0).then(a.bind(null,153)).then((function(e){console.log("[indexedDB] Creating database instance"),(new e.default).onsuccess=function(e){window.database=e.target.result,t()}}))}},{key:"toggleStar",value:function(){this.setState(Object(s.a)(Object(s.a)({},this.state),{},{starred:!this.state.starred}))}},{key:"parseDate",value:function(e){var t,a=new Date(e),s=function(e){return e<10?"0"+e:e};switch(a.getMonth()){case 0:t="Jan";break;case 1:t="Feb";break;case 2:t="Mar";break;case 3:t="Apr";break;case 4:t="May";break;case 5:t="Jun";break;case 6:t="Jul";break;case 7:t="Aug";break;case 8:t="Sep";break;case 9:t="Oct";break;case 10:t="Nov";break;case 11:t="Dec"}return"".concat(s(a.getDate())," ").concat(t," ").concat(s(a.getHours()),":").concat(s(a.getMinutes()))}},{key:"parseNotifDelta",value:function(e){var t=10*e;return t<60?"".concat(t," min before"):t/60<24?"".concat(Math.round(t/60)," hr(s) before"):"".concat(Math.round(t/1440)," day(s) before")}},{key:"toggleState",value:function(){this.setState(Object(s.a)(Object(s.a)({},this.state),{},{isOpen:!this.state.isOpen}))}},{key:"handleDelete",value:function(){var e=this,t=function(){window.database.delete("tasks",e.task.id).onsuccess=function(){e.props.unMount&&e.props.unMount()}};window.confirm&&window.confirm({title:"Delete Task?",text:'Are you sure you want to delete the task "'.concat(this.task.title,'"? This task will NOT be marked as done or pending, it will be deleted from the database. This action is irreversible.')},(function(){window.database?t():a.e(0).then(a.bind(null,153)).then((function(e){console.log("[indexedDB] Creating database instance"),(new e.default).onsuccess=function(e){window.database=e.target.result,t()}}))}))}},{key:"render",value:function(){return d.a.createElement("div",{className:this.props.classes.root},d.a.createElement(u.a,{expanded:this.state.isOpen,className:this.task.done?this.props.classes.done:this.task.starred?this.props.classes.starred:""},d.a.createElement(h.a,{expandIcon:d.a.createElement(v.a,null),onClick:this.toggleState},d.a.createElement(m.a,{className:this.props.classes.heading},this.task.title),d.a.createElement("div",{className:this.props.classes.grow}),d.a.createElement("div",{className:this.props.classes.reminderTiming},d.a.createElement(m.a,{className:this.props.classes.secondaryHeading},this.task.reminder?this.parseDate(this.task.deadline):""))),d.a.createElement(b.a,{className:this.props.classes.details},d.a.createElement("div",{className:this.props.classes.fullWidth},d.a.createElement(m.a,{variant:"button",className:this.props.classes.secHeading3},"Description"),d.a.createElement("br",null),d.a.createElement("div",{className:this.props.classes.description},this.task.description?this.task.description.split("\n").map((function(e){return d.a.createElement("div",null,e,d.a.createElement("br",null))})):d.a.createElement("i",null,"No description provided"))),d.a.createElement("div",{className:this.props.classes.othDetails},d.a.createElement("div",{className:this.props.classes.column},d.a.createElement(m.a,{variant:"button",className:this.props.classes.secHeading3},"Due At"),d.a.createElement("br",null),d.a.createElement("div",{className:this.props.classes.description},this.parseDate(this.task.deadline))),d.a.createElement("div",{className:this.props.classes.column},d.a.createElement(m.a,{variant:"button",className:this.props.classes.secHeading3},"Reminder"),d.a.createElement("br",null),d.a.createElement("div",{className:this.props.classes.description},this.parseNotifDelta(this.task.notifTimeDelta))))),d.a.createElement(k.a,null),d.a.createElement(g.a,null,d.a.createElement(f.a,{disabled:this.task.done,startIcon:d.a.createElement(w.a,null),size:"small",onClick:this.handleDelete},"Delete"),d.a.createElement(E.b,{to:this.task.done?"#":"/todox/edit/".concat(this.task.id)},d.a.createElement(f.a,{disabled:this.task.done,startIcon:d.a.createElement(y.a,null),size:"small",color:"secondary"},"Edit")),d.a.createElement(f.a,{disabled:this.task.done,startIcon:d.a.createElement(D.a,null),size:"small",color:"primary",onClick:this.markAsDone},"Mark as done"))))}}]),o}(d.a.Component);t.default=Object(p.a)((function(e){return{root:{width:"100%",marginBottom:e.spacing(1)},grow:{flexGrow:1,minWidth:e.spacing(1)},heading:{fontSize:e.typography.pxToRem(15)},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary},secHeading3:{fontSize:e.typography.pxToRem(12),color:e.palette.text.secondary},icon:{verticalAlign:"bottom",height:20,width:20},details:{alignItems:"center",display:"block"},column:{flexBasis:"33.33%"},starred:{borderLeft:"3px solid yellow"},done:{borderLeft:"3px solid #4caf50"},reminderTiming:{minWidth:"fit-content"},fullWidth:{width:"100%"},othDetails:{display:"flex"},description:{marginLeft:e.spacing(1)}}}))(N)}}]);
//# sourceMappingURL=4.a7df7a22.chunk.js.map