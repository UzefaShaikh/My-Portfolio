$(function(){
  var P=[['home','Home','bi-house','cols'],['about','About','bi-person','iris'],['skills','Skills','bi-code-slash','rows'],['education','Education','bi-mortarboard','diag'],['certifications','Certificates','bi-award','doors'],['contact','Contact','bi-envelope','diamond']];
  var cur=$('body').data('page'),i,c='',o='',T={},L={},seen=false;
  try{seen=!!sessionStorage.getItem('intro')}catch(e){}
  $.each(P,function(_,p){T[p[0]]=p[3];L[p[0]]=p[1];o+='<a href="'+p[0]+'.html" class="'+(p[0]==cur?'active':'')+'"><i class="bi '+p[2]+'"></i><span>'+p[1]+'</span></a>'});
  for(i=0;i<6;i++)c+='<i style="--i:'+i+'"></i>';
  $('body').prepend('<div class="curtain t-'+T[cur]+'">'+c+'<b class="cl">'+L[cur]+'</b></div><div class="prog"></div><div class="glow"></div><a class="logo" href="home.html">u<span>.</span>s</a><nav class="dock">'+o+'</nav>');
  $('main').append('<footer class="container">Designed &amp; coded by Uzefa Shaikh &middot; HTML5, CSS3, jQuery &amp; Bootstrap</footer>');
  $('.ph').append('<svg class="swash" viewBox="0 0 300 40"><path d="M2 30C60-5 120 40 190 14S280 8 298 26"/></svg>');
  for(i=0;i<12;i++){var s=20+Math.random()*80;$('body').append('<div class="orb" style="width:'+s+'px;height:'+s+'px;left:'+Math.random()*100+'%;animation-duration:'+(16+Math.random()*20)+'s;animation-delay:-'+Math.random()*30+'s"></div>')}
  // page transitions: each page has its own; the destination's style plays
  $(document).on('click','a[href$=".html"]',function(e){
    if(this.target||e.ctrlKey||e.metaKey)return;
    e.preventDefault();var h=this.href,t=h.split('/').pop().replace('.html','');
    $('.cl').text(L[t]||'');$('.curtain').attr('class','curtain t-'+(T[t]||'cols')+' in');
    setTimeout(function(){location.href=h},560)});
  $(window).on('pageshow',function(){$('.curtain').attr('class','curtain t-'+T[cur])});
  $('a[href$=".html"]').one('mouseenter touchstart',function(){$('head').append('<link rel="prefetch" href="'+this.href+'">')});
  // glow, parallax, progress
  $(document).on('mousemove',function(e){$('.glow').css({left:e.clientX,top:e.clientY});
    $('.hero .photo').css('translate',((e.clientX/innerWidth-.5)*22)+'px '+((e.clientY/innerHeight-.5)*22)+'px')});
  $(window).on('scroll',function(){var h=$(document).height()-$(window).height();$('.prog').css('width',(h?$(window).scrollTop()/h*100:0)+'%')});
  // magnetic buttons
  $('.btn-x').on('mousemove',function(e){var r=this.getBoundingClientRect();$(this).css('translate',((e.clientX-r.left-r.width/2)*.2)+'px '+((e.clientY-r.top-r.height/2)*.3)+'px')}).on('mouseleave',function(){$(this).css('translate','')});
  // name letters (animated only on the first visit)
  var base=seen?0:.3;
  if(seen)$('.name').addClass('noanim');
  $('.split').each(function(){var h='';$.each($(this).text().split(''),function(n,ch){h+='<span class="l" style="animation-delay:'+(base+n*.06)+'s">'+(ch==' '?'&nbsp;':ch)+'</span>'});$(this).html(h)});
  function type($el,words,speed,hold,cb){var w=0,j=0,del=false;(function t(){var s=words[w];if(j==0&&!del&&cb)cb(w);j+=del?-1:1;$el.text(s.slice(0,j));var d=del?speed/2:speed;
    if(!del&&j==s.length){del=true;d=hold}else if(del&&j==0){del=false;w=(w+1)%words.length;d=250}setTimeout(t,d)})()}
  if($('#hello').length){
    if(!seen){
      try{sessionStorage.setItem('intro',1)}catch(e){}
      var H=[['Hello','English'],['नमस्ते','Hindi'],['નમસ્તે','Gujarati'],['Bonjour','French'],['آداب','Urdu'],['مرحبا','Arabic'],['Athchomar chomakaan','Dothraki'],['Rytsas','High Valyrian'],['Χαῖρε','Old Greek'],['Hola','Spanish']];
      setTimeout(function(){type($('#hello'),$.map(H,function(x){return x[0]}),90,800,function(n){$('#lang').text(H[n][1]);$('#hello').attr('dir',/[\u0600-\u06FF]/.test(H[n][0])?'rtl':'ltr')})},200)}
    else $('.hello,#lang').hide();
    setTimeout(function(){type($('#role'),['Web Developer','PHP & MySQL Builder','MERN Stack Learner','BCA Student'],70,1200)},seen?100:400)}
  // reveal, counters, bars
  $('.rv').each(function(){$(this).css('--d',($(this).index()%6)*.08+'s')});
  var io=new IntersectionObserver(function(en){$.each(en,function(_,x){if(!x.isIntersecting)return;var $t=$(x.target);$t.addClass('in');io.unobserve(x.target);
    $t.find('[data-count]').add($t.filter('[data-count]')).each(function(){var $n=$(this),to=+$n.data('count'),dc=+$n.data('dec')||0;$({v:0}).animate({v:to},{duration:1400,step:function(v){$n.text(v.toFixed(dc))},complete:function(){$n.text(to.toFixed(dc)+($n.data('plus')||''))}})})})},{threshold:.12});
  setTimeout(function(){$('.rv').each(function(){io.observe(this)})},100);
  // ---- quick jump to a page (uses that page's own transition)
  function go(t){$('.pal').removeClass('on');$('.cl').text(L[t]);$('.curtain').attr('class','curtain t-'+T[t]+' in');setTimeout(function(){location.href=t+'.html'},560)}
  // ---- "Hiring for what?" role picker
  var R={
   php:{t:'PHP / Web Developer',s:['PHP','MySQL','HTML5','CSS','JavaScript','Git / GitHub'],p:'Student Management System',d:'CRUD operations, session-based admin login, protected pages and live search across 6 fields, built on PHP and MySQL.',l:'#projects',b:'See the project'},
   mern:{t:'MERN / Full-stack Developer',s:['React','Node.js','Express.js','MongoDB','REST APIs','Axios'],p:'Event Management System',d:'A REST API with 5 endpoints, a Mongoose schema with 7 fields and React Router protected routes.',l:'#projects',b:'See the project'},
   intern:{t:'Web Development Intern',s:['HTML5','CSS','JavaScript','PHP','React','Git / GitHub'],p:'Two projects, built end to end',d:'Database, back end and interface done by me in both, plus a CGPA of 8.55 in my last academic year.',l:'education.html',b:'See my results'},
   data:{t:'Data / Analytics Intern',s:['Power BI','Python','SQL','Data analytics'],p:'Five completed courses',d:'Power BI & Data Analytics, Data Analytics (WSCubeTech), Python and Data Science basics (UniAthena) and Generative AI Studio.',l:'certifications.html',b:'See the certificates'}};
  function role(k){var r=R[k],h='<h3>'+r.t+'</h3><p class="soft">Why I fit</p><p>'+$.map(r.s,function(x){return '<span class="tag">'+x+'</span>'}).join('')+'</p><p class="mb-1"><b style="color:var(--ink)">'+r.p+'</b></p><p>'+r.d+'</p><a class="btn-x fill" href="'+r.l+'">'+r.b+'</a><a class="btn-x" href="contact.html">Contact me</a>';
    $('.rb').removeClass('on').filter('[data-r='+k+']').addClass('on');$('#fit .pn').stop(true).fadeOut(150,function(){$(this).html(h).fadeIn(350)})}
  $('.rb').on('click',function(){role($(this).data('r'))});if($('.rb').length)role('php');
  // ---- live mini Student Management demo
  var S=[['Aarav Patel','Surat','BCA'],['Meera Shah','Vadodara','BBA'],['Rohan Desai','Navsari','BCA'],['Sana Khan','Surat','B.Com'],['Kabir Mehta','Bharuch','BSc IT'],['Isha Joshi','Rajkot','BCA']],D=[],nid=2401;
  function esc(s){return $('<div>').text(s).html()}
  function add(n,c,o){D.push({id:'EN'+nid,n:n,e:n.toLowerCase().replace(/[^a-z]+/g,'.')+'@example.com',p:'90000 0'+(1000+nid),c:c,o:o});nid++}
  function draw(newId){var q=$('#q').val().toLowerCase(),rows=$.grep(D,function(d){return [d.id,d.n,d.e,d.p,d.c,d.o].join(' ').toLowerCase().indexOf(q)>-1});
    $('#cnt').text(D.length);
    $('#tb').html(rows.length?$.map(rows,function(d){return '<tr'+(d.id==newId?' class="new"':'')+'><td>'+d.id+'</td><td style="color:var(--ink)">'+esc(d.n)+'</td><td>'+esc(d.e)+'</td><td>'+d.p+'</td><td>'+esc(d.c)+'</td><td>'+esc(d.o)+'</td><td><button class="del" data-id="'+d.id+'">Delete</button></td></tr>'}).join(''):'<tr><td colspan="7" class="text-center soft py-4">No student matches. Try another word.</td></tr>')}
  if($('#tb').length){$.each(S,function(_,s){add(s[0],s[1],s[2])});draw();
    $('#q').on('input',function(){draw()});
    $('#tb').on('click','.del',function(){var $b=$(this);if(!$b.hasClass('sure')){$b.addClass('sure').text('Sure?');setTimeout(function(){$b.removeClass('sure').text('Delete')},2500);return}
      var id=$b.data('id');$b.closest('tr').fadeOut(300,function(){D=$.grep(D,function(d){return d.id!=id});draw()})});
    $('#af').on('submit',function(e){e.preventDefault();var f=$(this),n=$.trim(f.find('[name=n]').val());if(!n)return;add(n,$.trim(f.find('[name=c]').val())||'Surat',$.trim(f.find('[name=o]').val())||'BCA');$('#q').val('');draw('EN'+(nid-1));this.reset()})}
  // ---- command palette (Ctrl+K or /)
  function toast(m){$('.toast-x').text(m).addClass('on');setTimeout(function(){$('.toast-x').removeClass('on')},1800)}
  var I=$.map(P,function(p){return [[p[1],p[2],function(){go(p[0])}]]}).concat([
    ['Download CV','bi-download',function(){window.open('assets/Uzefa_Shaikh_Resume.pdf')}],
    ['Copy email address','bi-clipboard',function(){try{navigator.clipboard.writeText('uzefashaikh082@gmail.com')}catch(e){}toast('Email copied')}],
    ['Send an email','bi-envelope',function(){location.href='mailto:uzefashaikh082@gmail.com'}],
    ['Call +91 93284 64932','bi-telephone',function(){location.href='tel:+919328464932'}],
    ['LinkedIn profile','bi-linkedin',function(){window.open('https://www.linkedin.com/in/uzefa-shaikh-71b239419')}],
    ['GitHub profile','bi-github',function(){window.open('https://github.com/UzefaShaikh')}],
    ['Event Management System repo','bi-github',function(){window.open('https://github.com/UzefaShaikh/Event-Management-System')}],
    ['Student Management System repo','bi-github',function(){window.open('https://github.com/UzefaShaikh/Student-Management-System')}]]);
  var sel=0,V=[];
  $('body').append('<div class="pal"><div class="box"><input placeholder="Jump to a page or action..." aria-label="Quick jump"><ul></ul></div></div><button class="kbtn" aria-label="Quick jump"><i class="bi bi-search"></i>Quick jump <kbd>Ctrl K</kbd></button><div class="toast-x"></div>');
  function hl(){$('.pal li').removeClass('sel').eq(sel).addClass('sel')}
  function list(){var q=$('.pal input').val().toLowerCase();V=$.grep(I,function(x){return x[0].toLowerCase().indexOf(q)>-1});sel=0;$('.pal ul').html($.map(V,function(x){return '<li><i class="bi '+x[1]+'"></i>'+x[0]+'</li>'}).join(''));hl()}
  function openP(){$('.pal').addClass('on');$('.pal input').val('').focus();list()}
  function runP(n){if(!V[n])return;$('.pal').removeClass('on');V[n][2]()}
  $('.kbtn').on('click',openP);$('.pal input').on('input',list);
  $('.pal').on('click',function(e){if(e.target==this)$(this).removeClass('on')}).on('click','li',function(){runP($(this).index())});
  $(document).on('keydown',function(e){var typing=/INPUT|TEXTAREA/.test(e.target.tagName);
    if(((e.ctrlKey||e.metaKey)&&e.key=='k')||(e.key=='/'&&!typing)){e.preventDefault();openP()}
    else if($('.pal').hasClass('on')){if(e.key=='Escape')$('.pal').removeClass('on');
      else if(e.key=='ArrowDown'){e.preventDefault();sel=(sel+1)%V.length;hl()}
      else if(e.key=='ArrowUp'){e.preventDefault();sel=(sel-1+V.length)%V.length;hl()}
      else if(e.key=='Enter')runP(sel)}});
  // 3D tilt
  $('.tilt').on('mousemove',function(e){var r=this.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;$(this).css('transform','perspective(800px) rotateY('+x*10+'deg) rotateX('+-y*10+'deg) translateZ(8px)')}).on('mouseleave',function(){$(this).css('transform','')});
  $('#cf').on('submit',function(e){e.preventDefault();var f=$(this);
    location.href='mailto:uzefashaikh082@gmail.com?subject='+encodeURIComponent('Portfolio message from '+f.find('[name=n]').val())+'&body='+encodeURIComponent(f.find('[name=m]').val()+'\n\n'+f.find('[name=e]').val());
    $('#ok').fadeIn()});
});
