import{a as D,b as p,c as P,d as k,g as z,h as j,i as I,j as N,l as T}from"./chunk-GSC63Y56.js";import{a as E}from"./chunk-RKNKRETS.js";import{l as M,m as O,p as F}from"./chunk-3MZDES6H.js";import{$ as h,$a as e,Ea as g,Ja as v,Na as m,Va as s,_ as x,_a as t,a as _,ab as u,b,eb as S,fb as C,gb as w,mb as i,ob as y,za as l}from"./chunk-LWO5DMJ3.js";function G(n,o){n&1&&(t(0,"small",19),i(1," Min. 3 znaki! "),e())}function V(n,o){n&1&&(t(0,"small",19),i(1," Wprowad\u017A poprawny email! "),e())}function A(n,o){n&1&&(t(0,"small",19),i(1," Min. 10 znak\xF3w! "),e())}function W(n,o){if(n&1){let r=S();t(0,"label")(1,"input",20),C("change",function(){let c=x(r).$implicit,d=w();return h(d.toggleService(c))}),e(),i(2),e()}if(n&2){let r=o.$implicit;l(2),y(" ",r," ")}}function q(n,o){n&1&&(t(0,"span"),i(1,"\u{1F4E8} Wy\u015Blij zapytanie"),e())}function H(n,o){n&1&&(t(0,"span"),i(1,"\u23F3 Wysy\u0142anie..."),e())}function L(n,o){n&1&&(t(0,"div",21)(1,"p"),i(2,"\u2705 Dzi\u0119kujemy za wiadomo\u015B\u0107! Odpowiemy tak szybko, jak to mo\u017Cliwe. \u{1F680}"),e()())}var B=class n{constructor(o,r){this.fb=o;this.http=r;this.contactForm=this.fb.group({name:["",[p.required,p.minLength(3)]],email:["",[p.required,p.email]],phone:[""],message:["",[p.required,p.minLength(10)]]})}contactForm;isSending=!1;messageSent=!1;selectedServices=[];services=["Aplikacje Webowe","Aplikacje Mobilne","Chmura","Optymalizacja System\xF3w"];toggleService(o){this.selectedServices.includes(o)?this.selectedServices=this.selectedServices.filter(r=>r!==o):this.selectedServices.push(o)}sendMessage(){if(this.contactForm.invalid)return;this.isSending=!0;let o=b(_({},this.contactForm.value),{selectedServices:this.selectedServices});this.http.post("http://localhost:3000/send-email",o).subscribe(()=>{this.isSending=!1,this.messageSent=!0,this.contactForm.reset(),this.selectedServices=[]},()=>{this.isSending=!1,alert("B\u0142\u0105d podczas wysy\u0142ania wiadomo\u015Bci. Spr\xF3buj ponownie.")})}static \u0275fac=function(r){return new(r||n)(g(N),g(E))};static \u0275cmp=v({type:n,selectors:[["app-contact"]],decls:40,vars:9,consts:[["id","contact",1,"section","fade-in"],[1,"contact-container"],[1,"fade-in"],[1,"contact-form","fade-in",3,"ngSubmit","formGroup"],[1,"form-step"],[1,"input-group"],["for","name"],["id","name","type","text","formControlName","name","placeholder","Wpisz swoje imi\u0119 i nazwisko"],["class","error",4,"ngIf"],["for","email"],["id","email","type","email","formControlName","email","placeholder","Tw\xF3j adres email"],["for","phone"],["id","phone","type","tel","formControlName","phone","placeholder","Opcjonalnie - Tw\xF3j numer telefonu"],["for","message"],["id","message","formControlName","message","placeholder","Napisz swoj\u0105 wiadomo\u015B\u0107..."],[4,"ngFor","ngForOf"],["type","submit",1,"contact-btn","pulse-effect",3,"disabled"],[4,"ngIf"],["class","success-message fade-in",4,"ngIf"],[1,"error"],["type","checkbox",3,"change"],[1,"success-message","fade-in"]],template:function(r,a){if(r&1&&(t(0,"div",0)(1,"div",1)(2,"h2",2),i(3,"\u{1F4E9} Skontaktuj si\u0119 z nami"),e(),t(4,"p",2),i(5,"Masz pytania? Chcesz nawi\u0105za\u0107 wsp\xF3\u0142prac\u0119? Napisz do nas!"),e(),t(6,"form",3),C("ngSubmit",function(){return a.sendMessage()}),t(7,"div",4)(8,"h3"),i(9,"\u{1F464} Twoje dane"),e(),t(10,"div",5)(11,"label",6),i(12,"Imi\u0119 i nazwisko"),e(),u(13,"input",7),m(14,G,2,0,"small",8),e(),t(15,"div",5)(16,"label",9),i(17,"\u{1F4E7} Email"),e(),u(18,"input",10),m(19,V,2,0,"small",8),e(),t(20,"div",5)(21,"label",11),i(22,"\u{1F4DE} Telefon"),e(),u(23,"input",12),e()(),t(24,"div",4)(25,"h3"),i(26,"\u{1F4A1} Opowiedz nam o swoim projekcie"),e(),t(27,"div",5)(28,"label",13),i(29,"\u270D\uFE0F Opis projektu"),e(),u(30,"textarea",14),m(31,A,2,0,"small",8),e()(),t(32,"div",4)(33,"h3"),i(34,"\u2699\uFE0F Jakie us\u0142ugi Ci\u0119 interesuj\u0105?"),e(),m(35,W,3,1,"label",15),e(),t(36,"button",16),m(37,q,2,0,"span",17)(38,H,2,0,"span",17),e(),m(39,L,3,0,"div",18),e()()()),r&2){let c,d,f;l(6),s("formGroup",a.contactForm),l(8),s("ngIf",((c=a.contactForm.get("name"))==null?null:c.invalid)&&((c=a.contactForm.get("name"))==null?null:c.touched)),l(5),s("ngIf",((d=a.contactForm.get("email"))==null?null:d.invalid)&&((d=a.contactForm.get("email"))==null?null:d.touched)),l(12),s("ngIf",((f=a.contactForm.get("message"))==null?null:f.invalid)&&((f=a.contactForm.get("message"))==null?null:f.touched)),l(4),s("ngForOf",a.services),l(),s("disabled",a.isSending),l(),s("ngIf",!a.isSending),l(),s("ngIf",a.isSending),l(),s("ngIf",a.messageSent)}},dependencies:[F,M,O,T,z,D,P,k,j,I],styles:['@charset "UTF-8";.section[_ngcontent-%COMP%]{width:100%;padding:100px 0;background:linear-gradient(135deg,#0f172a,#1e293b);display:flex;justify-content:center;align-items:center;text-align:center}.contact-container[_ngcontent-%COMP%]{width:80%;max-width:900px;padding:50px 40px;background:#ffffff1a;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-radius:12px;box-shadow:0 10px 30px #fff3;animation:_ngcontent-%COMP%_fadeIn 1s ease-in-out}h2[_ngcontent-%COMP%]{font-size:3rem;color:#fc0;margin-bottom:15px}p[_ngcontent-%COMP%]{font-size:1.3rem;color:#ddd;margin-bottom:30px}.contact-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;font-weight:700;margin-bottom:5px;color:#fc0;font-size:1.1rem;text-transform:uppercase}.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .input-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;padding:14px;border-radius:8px;border:none;background:#ffffff26;color:#fff;font-size:1.1rem;transition:all .3s ease-in-out}.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .input-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{outline:none;background:#ffffff4d;border:2px solid #ffcc00}.error[_ngcontent-%COMP%]{color:#ff4c4c;font-size:.9rem;margin-top:5px}.contact-btn[_ngcontent-%COMP%]{background:linear-gradient(45deg,#ff416c,#ff4b2b);border:none;color:#fff;padding:15px 30px;font-size:1.4rem;font-weight:700;border-radius:50px;cursor:pointer;transition:transform .3s ease-in-out,box-shadow .3s ease-in-out;display:flex;align-items:center;justify-content:center;gap:10px;text-transform:uppercase;position:relative;overflow:hidden}.pulse-effect[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 2s infinite}@keyframes _ngcontent-%COMP%_pulse{0%{box-shadow:0 0 15px #ff4b2b66}50%{box-shadow:0 0 30px #ff4b2b99}to{box-shadow:0 0 15px #ff4b2b66}}.contact-btn[_ngcontent-%COMP%]:hover{transform:scale(1.07);box-shadow:0 8px 25px #ff4b2b99}.success-message[_ngcontent-%COMP%]{margin-top:20px;padding:15px;background:#28a745;color:#fff;border-radius:8px;font-weight:700;font-size:1.2rem}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.fade-in[_ngcontent-%COMP%]{opacity:0;animation:_ngcontent-%COMP%_fadeIn 1s ease-in-out forwards}@media (max-width: 768px){h2[_ngcontent-%COMP%]{font-size:2.5rem}p[_ngcontent-%COMP%]{font-size:1.1rem}.contact-container[_ngcontent-%COMP%]{width:90%;padding:30px 20px}}']})};export{B as a};
