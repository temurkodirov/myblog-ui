import{_}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{r as m,o as i,c as r,a as s,b as a,w as o,n as c,d as g,t as f,e as y,p as w,f as k,g as $}from"./index-BxNye9P6.js";import{i as U}from"./imagePathfixer-CcxXgNhq.js";const N={name:"sidebard",data(){return{lokalUser:{id:"0",ism:"",familiya:"",kasblar_id:"",login:"",token:""}}},mounted(){let e=JSON.parse(localStorage.getItem("lokalUser"));this.lokalUser=e}},S={id:"layout-menu",class:"layout-menu menu-vertical menu bg-menu-theme"},C={class:"app-brand demo"},B=s("span",{class:"app-brand-text demo menu-text fw-bolder ms-2"},"Sneat",-1),I=s("div",{class:"menu-inner-shadow"},null,-1),L={class:"menu-inner py-1"},P=s("i",{class:"menu-icon tf-icons bx bx-home-circle"},null,-1),z=s("div",{"data-i18n":"Analytics"},"Dashboard",-1),O=s("i",{class:"menu-icon tf-icons bx bx-layout"},null,-1),j=s("div",{"data-i18n":"Layouts"},"Xonalar",-1),A=s("i",{class:"menu-icon tf-icons bx bx-layout"},null,-1),J=s("div",{"data-i18n":"Layouts"},"Jihozlar",-1),M=s("i",{class:"menu-icon tf-icons bx bx-layout"},null,-1),R=s("div",{"data-i18n":"Layouts"},"Buyurtmalar",-1),V=s("i",{class:"menu-icon tf-icons bx bx-layout"},null,-1),D=s("div",{"data-i18n":"Layouts"},"Buyurtmalar",-1),K=s("i",{class:"menu-icon tf-icons bx bx-layout"},null,-1),X=s("div",{"data-i18n":"Layouts"},"Buyurtmalar",-1);function q(e,u,h,p,l,d){const t=m("router-link");return i(),r("aside",S,[s("div",C,[a(t,{to:"/",class:"app-brand-link"},{default:o(()=>[B]),_:1})]),I,s("ul",L,[s("li",{class:c(["menu-item",this.$route.name==="dashboard"?"active":""])},[a(t,{to:"/",class:"menu-link"},{default:o(()=>[P,z]),_:1})],2),s("li",{class:c(["menu-item",this.$route.name==="rooms"?"active":""])},[a(t,{to:"/rooms",class:"menu-link menu-toggle"},{default:o(()=>[O,j]),_:1})],2),s("li",{class:c(["menu-item",this.$route.name==="furniture"?"active":""])},[a(t,{to:"/furniture",class:"menu-link menu-toggle"},{default:o(()=>[A,J]),_:1})],2),s("li",{class:c(["menu-item",this.$route.name==="orders"?"active":""])},[a(t,{to:"/orders",class:"menu-link menu-toggle"},{default:o(()=>[M,R]),_:1})],2),s("li",{class:c(["menu-item",this.$route.name==="ordersAccountant"?"active":""])},[a(t,{to:"/orders-accountant",class:"menu-link menu-toggle"},{default:o(()=>[V,D]),_:1})],2),s("li",{class:c(["menu-item",this.$route.name==="ordersWarehouse"?"active":""])},[a(t,{to:"/orders-warehouse",class:"menu-link menu-toggle"},{default:o(()=>[K,X]),_:1})],2)])])}const E=_(N,[["render",q]]),b="/assets/avatar-BhDA0Skp.png",F={name:"navbar",data(){return{lokalUser:{firstName:"",lastName:"",email:"",imagePath:"",userId:0,identityRole:null}}},methods:{imagePathfixer:U,signOut(){localStorage.clear(),this.lokalUser={firstName:"",lastName:"",email:"",userId:0,identityRole:null}},getLocalUser(){let e=localStorage.getItem("lokalUser");this.lokalUser=JSON.parse(e)}},mounted(){this.getLocalUser()},created(){}},n=e=>(w("data-v-7374a0ee"),e=e(),k(),e),T={class:"layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme",id:"layout-navbar"},W=n(()=>s("div",{class:"layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"},[s("a",{class:"nav-item nav-link px-0 me-xl-4",href:"javascript:void(0)"},[s("i",{class:"bx bx-menu bx-sm"})])],-1)),G={class:"navbar-nav-right d-flex align-items-center justify-content-between",id:"navbar-collapse"},H={class:"navbar-nav align-items-center"},Q={class:"nav-item d-flex align-items-center"},Y=n(()=>s("span",{class:"app-brand-text demo menu-text fw-bolder ms-2",style:{"text-transform":"none"}},"MyBlog.uz",-1)),Z={class:""},ss={key:0,class:"navbar-nav flex-row align-items-center ms-auto"},es={class:"nav-item navbar-dropdown dropdown-user dropdown"},ts=n(()=>s("button",{class:"nav-link dropdown-toggle hide-arrow","data-bs-toggle":"dropdown"},[s("div",{class:""},[s("i",{class:"bx bx-user-circle me-1 fs-3"}),s("span",{class:"fw-semibold"},"Kirish/Ro'yhatdan o'tish")])],-1)),as={class:"dropdown-menu dropdown-menu-end"},os=n(()=>s("i",{class:"bx bx-user me-2 fw-semibold"},null,-1)),ns=n(()=>s("span",{class:"align-middle"},"Kirish",-1)),ls=n(()=>s("i",{class:"bx bx-user-plus me-2 fs-3"},null,-1)),is=n(()=>s("span",{class:"align-middle"},"Ro'yhatdan o'tish",-1)),rs={key:1,class:"navbar-nav flex-row align-items-center ms-auto"},cs={class:"nav-item navbar-dropdown dropdown-user dropdown"},ds={class:"nav-link dropdown-toggle hide-arrow",href:"javascript:void(0);","data-bs-toggle":"dropdown"},us={class:""},ms=["src"],_s={key:1,src:b,alt:"",class:"avatar-image"},hs={class:"ms-2 fw-semibold"},ps={class:"dropdown-menu dropdown-menu-end"},gs={class:"dropdown-item",href:"#"},fs={class:"d-flex"},vs={class:"flex-shrink-0 me-3"},bs={class:"avatar avatar-online"},xs=["src"],ys={key:1,src:b,alt:"avatar",class:"avatar-image"},ws={class:"flex-grow-1"},ks={class:"fw-semibold d-block"},$s={class:"text-muted"},Us=n(()=>s("li",null,[s("div",{class:"dropdown-divider"})],-1)),Ns=n(()=>s("i",{class:"bx bx-message-dots me-2"},null,-1)),Ss=n(()=>s("span",{class:"align-middle"},"Mening bloglarim",-1)),Cs=n(()=>s("i",{class:"bx bx-user me-2"},null,-1)),Bs=n(()=>s("span",{class:"align-middle"},"Mening sahifam",-1)),Is=n(()=>s("li",null,[s("div",{class:"dropdown-divider"})],-1)),Ls=n(()=>s("i",{class:"bx bx-power-off me-2"},null,-1)),Ps=n(()=>s("span",{class:"align-middle"},"Chiqish",-1)),zs=[Ls,Ps];function Os(e,u,h,p,l,d){const t=m("router-link");return i(),r("nav",T,[W,s("div",G,[s("div",H,[s("div",Q,[a(t,{to:"/"},{default:o(()=>[Y]),_:1})])]),s("div",Z,[a(t,{to:"/",class:c(["text-gray fw-semibold me-3",{"text-primary":e.$route.path==="/"}])},{default:o(()=>[g(" Asosiy sahifa")]),_:1},8,["class"]),a(t,{to:"/blogs",class:c(["text-gray fw-semibold",{"text-primary":e.$route.path==="/blogs"}])},{default:o(()=>[g("Barcha Bloglarni ko'rish")]),_:1},8,["class"])]),s("div",null,[l.lokalUser===null||l.lokalUser.userId===0?(i(),r("ul",ss,[s("li",es,[ts,s("ul",as,[s("li",null,[a(t,{to:"/auth/login",class:"dropdown-item"},{default:o(()=>[os,ns]),_:1})]),s("li",null,[a(t,{to:"/auth/register",class:"dropdown-item"},{default:o(()=>[ls,is]),_:1})])])])])):l.lokalUser!==null||l.lokalUser.userId!==0?(i(),r("ul",rs,[s("li",null,[s("div",null,[a(t,{to:"/blog-create",class:"btn btn-outline-primary fw-semibold me-2"},{default:o(()=>[g(" Blog yaratish")]),_:1})])]),s("li",cs,[s("a",ds,[s("div",us,[l.lokalUser.imagePath?(i(),r("img",{key:0,src:d.imagePathfixer(l.lokalUser.imagePath),alt:"",class:"avatar-image"},null,8,ms)):(i(),r("img",_s)),s("span",hs,f(l.lokalUser.firstName),1)])]),s("ul",ps,[s("li",null,[s("a",gs,[s("div",fs,[s("div",vs,[s("div",bs,[l.lokalUser.imagePath?(i(),r("img",{key:0,src:d.imagePathfixer(l.lokalUser.imagePath),alt:"avatar",class:"avatar-image"},null,8,xs)):(i(),r("img",ys))])]),s("div",ws,[s("span",ks,f(l.lokalUser.firstName),1),s("small",$s,f(l.lokalUser.lastName),1)])])])]),Us,s("li",null,[a(t,{to:"/blogs/my-blogs",class:"dropdown-item"},{default:o(()=>[Ns,Ss]),_:1})]),s("li",null,[a(t,{to:"/user/update",class:"dropdown-item"},{default:o(()=>[Cs,Bs]),_:1})]),Is,s("li",null,[s("button",{class:"dropdown-item",onClick:u[0]||(u[0]=v=>d.signOut())},zs)])])])])):y("",!0)])])])}const js=_(F,[["render",Os],["__scopeId","data-v-7374a0ee"]]),As={name:"footerComponent"},Js={class:"d-flex flex-column h-100 bottom-0"},Ms=s("div",{class:"flex-grow-1"},null,-1),Rs=s("footer",{class:"footer mt-auto bg-white"},[s("div",{class:"container w-75 d-flex flex-md-row flex-column justify-content-between align-items-md-center gap-1 container-p-x py-3"},[s("div",null,[s("a",{href:"#",class:"footer-text fw-bolder"},"MyBlog.uz")]),s("div",null," Xizmatlar litsenziyaga ega. 2024 ")])],-1),Vs=[Ms,Rs];function Ds(e,u,h,p,l,d){return i(),r("div",Js,Vs)}const Ks=_(As,[["render",Ds]]),Xs={name:"defaultLayout",components:{FooterComponent:Ks,Navbar:js,Sidebard:E},data(){return{categories:[]}},methods:{async fetchCategory(){try{let e=await $.get("category/get-all?PageSize=50");e.status===200&&(this.categories=e.data.items,localStorage.setItem("localCategories",JSON.stringify(this.categories)))}catch(e){console.error(e.message)}}},async mounted(){await this.fetchCategory()},computed:{}},qs={class:"layout-wrapper layout-content-navbar"},Es={class:"layout-container"},Fs={class:"layout-page"};function Ts(e,u,h,p,l,d){const t=m("navbar"),v=m("router-view"),x=m("footerComponent");return i(),r("div",qs,[s("div",Es,[s("div",Fs,[a(t),a(v),a(x)])])])}const Qs=_(Xs,[["render",Ts]]);export{Qs as default};
