function s(a){const t=new Date(a),e=["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],n=String(t.getDate()).padStart(2,"0"),r=e[t.getMonth()],o=t.getFullYear();return`${n} ${r} ${o}`}export{s as f};
