import{g as w,r as y,o as i,c as n,a as e,k,v as I,n as f,F as c,h as m,e as x,t as d,b as g,w as P,d as S,p as N,f as D}from"./index-BxNye9P6.js";import{C as T,P as z,a as U,t as O}from"./carouselCardDesign-BY-aaCbG.js";import{f as j}from"./formateDate-BvL5N5Zm.js";import{_ as B}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./imagePathfixer-CcxXgNhq.js";const L={name:"postsView",components:{CarouselCardDesign:T,PostSkeleton:z,PostCarousel:U},data(){return{metaData:{currentPage:1,totalPages:1,pageSize:6,totalCount:0,order:"desc",hasPrevious:!1,hasNext:!1},params:{SearchText:null,CategoryId:null,UserId:null,PageNumber:1,PageSize:6,Order:null},postImages:["@/assets/img/elements/18.jpg","@/assets/img/elements/18.jpg"],posts:[],categories:[],postsLoaded:!1,searchQuery:""}},created(){this.$watch(()=>this.$route.query.CategoryId,async(o,t)=>{this.readParamsFromUrl(),await this.fetchPosts(this.params)})},computed:{computedPageNumber:{get(){return this.params.PageNumber},set(o){this.params.PageNumber=o,this.fetchPosts(this.params)}}},methods:{formatDate:j,textCutter:O,async fetchPosts(o){let t={...o};const l=new URLSearchParams(window.location.search);for(const a of l.keys())l.delete(a);for(const[a,u]of Object.entries(t))u!==null?l.set(a,u.toString()):l.delete(a);t.PageNumber<=1&&(l.delete("PageNumber"),l.delete("PageSize")),(t.Order==="desc"||t.Order==="DESC")&&l.delete("Order");const p=l.toString(),r=p?`${window.location.pathname}?${p}`:window.location.pathname;window.history.replaceState(null,"",r);try{this.posts=[];let a=null;a=await w.get("post/get-all",{params:t}),a.status===200&&(this.posts=a.data.items,this.metaData={...a.data.metaData},this.params.PageNumber=this.metaData.currentPage),this.postsLoaded=!0}catch(a){console.log(a.message)}},readParamsFromUrl(){const o=window.location.search,t=new URLSearchParams(o);t.get("SearchText")!=="null"&&t.has("SearchText")&&t.get("SearchText")!==null&&(this.params.SearchText=t.get("SearchText")),t.has("SearchText")&&t.get("SearchText")!=="null"&&(this.params.SearchText=t.get("SearchText")),t.has("CategoryId")&&t.get("CategoryId")!=="null"&&(this.params.CategoryId=t.get("CategoryId")),t.get("PageNumber")!==null&&(this.params.PageNumber=parseInt(t.get("PageNumber"))),t.get("PageSize")!==null&&(this.params.PageSize=parseInt(t.get("PageSize"))),t.get("Order")!==null&&(this.params.Order=t.get("Order"))},getPaginatedData(){this.fetchPosts(this.params)},async searchPost(){this.searchQuery.length<3?(this.params.SearchText=null,this.searchQuery.length===0&&await this.fetchPosts(this.params)):(this.params.SearchText=this.searchQuery,await this.fetchPosts(this.params))},async postsByCategory(o){this.params.CategoryId=o,await this.fetchPosts(this.params)},async changePage(o){this.params.PageNumber=o,await this.fetchPosts(this.params)},async fetchCategory(){try{let o=await w.get("category/get-all?PageSize=50");o.status===200&&(this.categories=o.data.items,this.selectedCategory=this.categories[0].id)}catch(o){console.error(o.message)}}},async mounted(){this.lokalUser=await JSON.parse(localStorage.getItem("lokalUser")),await this.readParamsFromUrl(),await this.fetchPosts(this.params),await this.fetchCategory()}},h=o=>(N("data-v-3be561dd"),o=o(),D(),o),V={class:"container-xxl flex-grow-1 container-p-y"},Q={class:"row"},F={class:"col-md-6 col-lg-3 col-xl-3 order-0 mb-4"},q={class:"card"},E={class:"card-body"},R={class:"input-group input-group-merge mb-4"},A=h(()=>e("span",{class:"input-group-text",id:"basic-addon-search31"},[e("i",{class:"bx bx-search"})],-1)),J={class:"p-0 m-0"},M={class:"d-flex mb-4 pb-1"},G=h(()=>e("div",{class:"avatar flex-shrink-0 me-3"},[e("span",{class:"avatar-initial rounded bg-label-primary"},[e("i",{class:"bx bx-category"})])],-1)),H={class:"d-flex w-100 flex-wrap align-items-center justify-content-between gap-2"},K={class:"me-2"},W={class:"d-flex mb-4 pb-1"},X=h(()=>e("div",{class:"avatar flex-shrink-0 me-3"},[e("span",{class:"avatar-initial rounded bg-label-primary"},[e("i",{class:"bx bx-category"})])],-1)),Y={class:"d-flex w-100 flex-wrap align-items-center justify-content-between gap-2"},Z={class:"me-2"},$=["onClick"],ee={class:"col-lg-9"},te={key:0,class:"row mb-5 m-auto"},se={class:"col-sm-12 col-md-6 col-lg-4 mb-4"},ae={key:1,class:"row mb-5 m-auto"},oe={class:"card"},re={class:"d-flex justify-content-center pt-3 px-3"},ie={class:"card-body"},ne={class:"card-title mb-0"},le={key:0,class:"badge bg-label-dark my-1"},ce={class:"card-text text-dark"},de={class:"d-flex mt-2 align-items-center justify-content-between"},he=h(()=>e("i",{class:"bx bx-calendar"},null,-1)),me={class:"d-flex justify-content-center"},ge={"aria-label":"Page navigation"},ue={class:"pagination"},pe={class:"page-item prev"},_e=["disabled"],be=h(()=>e("i",{class:"tf-icon bx bx-chevron-left"},null,-1)),ye=[be],fe={class:"page-item"},xe=["onClick"],Pe={class:"page-item next"},ve=["disabled"],we=h(()=>e("i",{class:"tf-icon bx bx-chevron-right"},null,-1)),Se=[we];function Ce(o,t,l,p,r,a){const u=y("post-skeleton"),C=y("carousel-card-design"),_=y("router-link");return i(),n("div",V,[e("div",Q,[e("div",F,[e("div",q,[e("div",E,[e("div",R,[A,k(e("input",{type:"text",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=s=>r.searchQuery=s),placeholder:"Search...","aria-label":"Search...","aria-describedby":"basic-addon-search31",onInput:t[1]||(t[1]=s=>a.searchPost())},null,544),[[I,r.searchQuery]])]),e("ul",J,[e("li",M,[G,e("div",H,[e("div",K,[e("button",{style:{width:"230px"},onClick:t[2]||(t[2]=s=>a.postsByCategory(null)),class:f(["btn btn-outline-primary mb-0",{active:r.params.CategoryId===null}])}," Barcha turdagi bloglar ",2)])])]),(i(!0),n(c,null,m(r.categories,s=>(i(),n("li",W,[X,e("div",Y,[e("div",Z,[e("button",{style:{width:"230px"},onClick:b=>a.postsByCategory(s.id),class:f([{active:r.params.CategoryId==s.id},"btn btn-outline-primary mb-0"])},d(s.name),11,$)])])]))),256))])])])]),e("div",ee,[r.postsLoaded?x("",!0):(i(),n("div",te,[(i(),n(c,null,m(6,s=>e("div",se,[g(u)])),64))])),r.postsLoaded?(i(),n("div",ae,[(i(!0),n(c,null,m(r.posts,(s,b)=>(i(),n("div",{class:"col-sm-12 col-md-6 col-lg-4 mb-4",key:b},[e("div",oe,[e("div",re,[g(C,{"img-list":s.images},null,8,["img-list"])]),e("div",ie,[g(_,{to:{name:"blogDetails",params:{blogId:s.id}}},{default:P(()=>[e("h5",ne,d(a.textCutter(s.title,30)),1)]),_:2},1032,["to"]),(i(!0),n(c,null,m(r.categories,v=>(i(),n(c,null,[v.id===s.categoryId?(i(),n("span",le,d(v.name),1)):x("",!0)],64))),256)),g(_,{to:{name:"blogDetails",params:{blogId:s.id}}},{default:P(()=>[e("p",ce,d(a.textCutter(s.content,100)),1)]),_:2},1032,["to"]),e("span",de,[e("span",null,[he,S(" "+d(a.formatDate(s.createdAt)),1)]),g(_,{to:{name:"blogDetails",params:{blogId:s.id}}},{default:P(()=>[S(" Davomini o'qish -> ")]),_:2},1032,["to"])])])])]))),128))])):x("",!0),e("div",me,[e("nav",ge,[e("ul",ue,[e("li",pe,[e("button",{class:"btn btn-icon btn-outline-primary btn-size",disabled:!r.metaData.hasPrevious,onClick:t[3]||(t[3]=s=>a.changePage(this.params.PageNumber-1))},ye,8,_e)]),(i(!0),n(c,null,m(r.metaData.totalPages,s=>(i(),n("li",fe,[e("button",{class:f(["btn btn-icon btn-outline-primary btn-size",{"active-pg-btn":this.metaData.currentPage===s}]),onClick:b=>a.changePage(s)},d(s),11,xe)]))),256)),e("li",Pe,[e("button",{class:"btn btn-icon btn-outline-primary btn-size",disabled:!r.metaData.hasNext,onClick:t[4]||(t[4]=s=>a.changePage(this.params.PageNumber+1))},Se,8,ve)])])])])])])])}const ze=B(L,[["render",Ce],["__scopeId","data-v-3be561dd"]]);export{ze as default};
