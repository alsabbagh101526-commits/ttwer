// Additive message library. This source is embedded in harvestModule for offline use.
// Original reflections below are deliberately not attributed to historical figures.
const MADAR_MESSAGE_SEEDS={
 faith:[
 'ابدأ صلاتك بنية الحضور، ولو كان قلبك مشتتًا؛ العودة إليه جزء من الطريق.',
 'اجعل بين أعمال يومك وقفة تذكر فيها الله بصدق.',
 'إذا ثقل عليك البدء، فخطوة الوضوء باب لطيف إلى الصلاة.',
 'لا تنتظر خشوعًا كاملًا لتصلي؛ تعلّم الخشوع وأنت تحافظ عليها.',
 'توبتك اليوم باب مفتوح، فلا تجعل خطأ الأمس يقف بينك وبين الدعاء.',
 'استغفار قصير بقلب حاضر قد يعيد ترتيب لحظة مزدحمة.',
 'اقرأ صفحة من القرآن بتأنّ، واترك لمعناها مكانًا في يومك.',
 'حين تسمع الأذان، امنح الصلاة حقها من الوقت قبل أن تتراكم المواعيد.',
 'اذكر نعمة محددة ثم احمد الله عليها؛ الشكر يبدأ بالملاحظة.',
 'أحسن الظن بالله، وخذ بالأسباب التي تستطيعها اليوم.',
 'اجعل دعاءك صادقًا بلغتك وبما يشغلك فعلًا.',
 'إن فاتتك سنة، فلا تجعل ذلك سببًا لترك الفريضة.',
 'قليل من الذكر على مهل خير من قائمة طويلة تغيب عنها بقلبك.',
 'الرجاء يدعوك إلى العمل، والخوف المعتدل يحرس نيتك.',
 'افتح المصحف لتقرأ ما تيسر، دون أن تجعل عدد الصفحات حكمًا على نفسك.',
 'اسأل نفسك بعد الصلاة عن خُلُق واحد تحب أن تصحبه بها.',
 'النية الصالحة تستطيع أن ترافق عملك المعتاد.',
 'كل عودة إلى الصلاة تستحق أن تثبتها بخطوة عملية صغيرة.',
 'لا تضيق على نفسك بعبادة فوق طاقتك؛ حافظ على ما تقدر عليه.',
 'حين تتعثر، ارجع إلى الله بصدق ثم أصلح ما تستطيع من أثر التعثر.'
 ],
 self:[
 'لا تجعل تعثرك اليوم يمنعك من البدء غدًا.',
 'الإنجاز الصغير المستمر أفضل من الحماس المؤقت.',
 'أعط نفسك حقها من الراحة دون إهمال مسؤولياتك.',
 'لا تقارن بدايتك بنهاية طريق غيرك.',
 'راجع أخطاءك لتتعلم، لا لتعاقب نفسك.',
 'اختر معيارًا عادلًا ليومك: ما كان ممكنًا لك في ظروفه؟',
 'تغيير الخطة عند الحاجة يدل على أنك تراقب الواقع بصدق.',
 'قل لنفسك ما تقوله لصديق يحاول من جديد.',
 'ابدأ بأصغر فعل يجعل المشكلة أوضح، ثم قرر ما بعده.',
 'لا تختزل قيمة يوم كامل في مهمة لم تكتمل.',
 'من حقك أن تطلب المساندة حين يطول عليك الطريق.',
 'الهدوء مهارة تتعلمها؛ لا تطلب من نفسك إتقانها فورًا.',
 'لاحظ تقدّمك مقارنة بما كنت عليه أنت، لا بما يعرضه الآخرون.',
 'أكمل ما بدأت حين يكون ذلك نافعًا، وعدّل المسار حين يتغير الهدف.',
 'الالتزام يتسع لفترات الراحة المقصودة والعودة بعد الانقطاع.',
 'دوّن ما نجح معك اليوم لتستفيد منه في يوم أصعب.',
 'ضع حدودًا لوقتك تحمي بها واجباتك وراحتك معًا.',
 'قد تكون أول خطوة اليوم مجرد ترتيب المكان الذي ستبدأ فيه.',
 'لا يلزمك تفسير كل تأخر على أنه ضعف شخصية.',
 'امنح الجهد الصادق تقديرًا حتى حين تتأخر النتيجة.'
 ],
 wife:[
 'اسأل زوجتك عما تحتاجه، واستمع إلى الإجابة دون افتراض مسبق.',
 'كلمة تقدير محددة أقرب إلى القلب من مجاملة عامة.',
 'اترك مساحة للحديث الهادئ قبل أن تتراكم التفاصيل الصغيرة.',
 'الاعتذار الواضح يبدأ بتسمية ما حدث دون تحميل الطرف الآخر اللوم.',
 'خصصا وقتًا قصيرًا تختارانه معًا بعيدًا عن المقاطعات.',
 'اسأل عن يومها لأنك مهتم بالتفاصيل التي تعني لها.',
 'قد يكون الاهتمام اليوم مساعدة عملية أكثر من عبارة جميلة.',
 'شاركها قرارًا يخصكما في وقت يسمح لكل منكما بالتفكير.',
 'حين تختلفان، تحدث عن أثر الموقف عليك بدل الحكم على نيتها.',
 'اشكرها على عمل تعرف أنها تبذل فيه وقتًا وجهدًا.',
 'أجّل النقاش الصعب إذا كنتما مرهقين، واتفقا على وقت للعودة إليه.',
 'هدية بسيطة تعبر عن انتباهك لما تحبه لا عن ثمنها.',
 'المودة تتكون أيضًا من عادات صغيرة تتكررانها برضا.',
 'اسأل: كيف أستطيع أن أكون سندًا هذا الأسبوع؟',
 'أعطِ خبرًا سارًا لكما وقتًا للاحتفال، ولو بكلمة.',
 'احفظ خصوصية خلافكما، واطلب المساعدة الموثوقة حين تحتاجانها.',
 'اهتمامك الصادق يترك مجالًا لرأيها وحدودها واختياراتها.',
 'لاحظ ما نجح في حواركما الأخير وكرراه.',
 'بعد الصلح، حددا خطوة عملية تمنع تكرار المشكلة نفسها.',
 'العلاقة تحتاج رحمة وتعاونًا أكثر مما تحتاج سجلًا للكمال.'
 ],
 family:[
 'اتصال قصير بالأهل بنية السؤال قد يفتح باب قرب كبير.',
 'اسأل والديك عما يخفف عنهما هذا الأسبوع.',
 'تذكر مناسبة عائلية واكتبها قبل أن يفوت وقتها.',
 'صلة الرحم قد تكون زيارة أو مكالمة أو عونًا بحسب الإمكان.',
 'استمع إلى حكاية أحد كبار العائلة؛ الإصغاء نوع من البر.',
 'أرسل رسالة تقدير لمن وقف معك من أهلك.',
 'إذا تعذر اللقاء، أخبرهم أنك تشتاق إليهم وحدد وقتًا مناسبًا.',
 'ساعد في أمر عملي دون انتظار طلب مباشر إن عرفت الحاجة.',
 'حافظ على حدودك بهدوء حين تحتاج إليها، ومعها الاحترام.',
 'اجعل حديثك مع الأهل مساحة سؤال لا قائمة نصائح فقط.',
 'اسأل عن قريب غاب صوته مدة دون افتراض سبب غيابه.',
 'الزيارة القصيرة التي تستطيع الوفاء بها خير من وعد كبير مؤجل.',
 'إذا وقع خلاف، اختر وقتًا هادئًا للتفاهم على ما يمكن إصلاحه.',
 'احتفظ بموقف جميل من عائلتك وعد إليه في يوم مزدحم.',
 'شارك أحد أهلك خبرًا يفرحك إذا كان يحب أن يسمعه.',
 'بر الوالدين لا يلغي احتياجك إلى الراحة والمساعدة.',
 'علّم من في بيتك أن الشكر يقال بصوت مسموع.',
 'اسأل عن صحة قريب يحتاج إلى متابعة بلطف دون إلحاح.',
 'أحيانًا يكفي أن تكون حاضرًا مع أهلك بلا هاتف.',
 'ابدأ بإصلاح ما تملكه من سلوكك واترك للآخرين مسؤولية اختياراتهم.'
 ],
 health:[
 'حركة قصيرة تناسب حالتك أفضل من خطة ترهقك ثم تتوقف.',
 'هيئ وقت النوم كما تهيئ موعدًا مهمًا في يومك.',
 'ضع الماء قريبًا منك ليسهل تذكر الشرب على مدار اليوم.',
 'ابدأ التمرين بدرجة مناسبة ثم راقب استجابة جسمك.',
 'وجبة متوازنة لا تحتاج إلى قواعد قاسية لتكون مفيدة.',
 'الراحة بعد الجهد جزء من التدريب وليست انقطاعًا عنه.',
 'إذا قلت طاقتك، اختر نسخة أخف من نشاطك بدل لوم نفسك.',
 'نزهة قصيرة قد تمنح يومك حركة وهواءً وفسحة.',
 'راقب انتظام نومك قبل أن تحكم على نفسك من ليلة واحدة.',
 'تقدم الصحة لا يُقاس برقم وزن واحد.',
 'توقف عن التمرين المؤلم واستشر مختصًا عند الحاجة.',
 'جهز ملابس الحركة مسبقًا إن كان ذلك يساعدك على البدء.',
 'أضف خيارًا مغذيًا إلى وجبتك قبل الانشغال بمنع كل شيء.',
 'اختر وقتًا واقعيًا للحركة يناسب مسؤولياتك.',
 'اسأل جسمك: هل يحتاج اليوم جهدًا أم استراحة؟',
 'الانتظام المرن أجدى من سباق يومي مع نفسك.',
 'جلسة تمدد لطيفة فرصة لملاحظة توتر العضلات.',
 'تدوين نومك يفيدك في رؤية نمطك، لا في محاسبة ليلة صعبة.',
 'يمكنك البدء بخمس دقائق مشي ثم زيادة الوقت إن ناسبك.',
 'امنح صحتك وقتًا في الجدول بدل تركها لما يتبقى منه.'
 ],
 finance:[
 'سجل المصروف كما وقع حتى ترى الصورة المالية بصدق.',
 'قبل الشراء، اسأل إن كان الشيء يخدم حاجة أو رغبة عابرة.',
 'ادخار مبلغ صغير ضمن قدرتك يبني عادة واضحة.',
 'راجع تاريخ قسطك القادم قبل أن توزع دخل الشهر.',
 'سداد الدين خطة تحتاج إلى أرقام واقعية ووقت مناسب.',
 'ميزانية الطعام تُراجع بما حدث فعلًا لا بما تمنيت حدوثه.',
 'اترك هامشًا للطوارئ إن سمحت ظروفك بدل خطة مشدودة تمامًا.',
 'لا تحكم على شهر مالي كامل من عملية شراء واحدة.',
 'قارن إنفاقك السابق بفئاته لتعرف أين يمكن التعديل.',
 'اكتب هدف الادخار وسبب أهميته لك حتى يبقى واضحًا.',
 'افصل دفعة أصل الدين عن مصروف اليوم كي لا تحسبها مرتين.',
 'الشفافية مع نفسك في الأرقام خطوة عملية لا محاكمة.',
 'إذا تغيّر دخلك، غيّر خطة السداد قبل أن يضغطك الجدول.',
 'انتظر وقتًا قصيرًا قبل شراء غير ضروري ثم قرر بهدوء.',
 'قد يكون تقليل مصروف متكرر أسهل من منع كل متعة.',
 'راجع الاشتراكات التي لا تستخدمها حين يقترب التجديد.',
 'لا تبنِ قرارًا ماليًا على مقارنة بظروف شخص آخر.',
 'احتفظ بإثبات السداد ليسهل عليك التحقق لاحقًا.',
 'حدد سقفًا لفئة واحدة قابلة للتعديل هذا الشهر.',
 'وضوح المتبقي من الدين يساعدك على اختيار خطوة ممكنة.'
 ],
 learning:[
 'اقرأ صفحة بتركيز ثم دوّن فكرة واحدة تستحق العودة.',
 'سؤال جيد بعد الدرس قد يكون بداية فهم أعمق.',
 'قسّم موضوعًا كبيرًا إلى عنوان تتعلمه اليوم.',
 'الاستمرار في التعلم لا يشترط ساعات طويلة كل يوم.',
 'راجع ما تعلمته قبل إضافة مصدر جديد إلى قائمتك.',
 'تطبيق فكرة واحدة يكشف لك ما تحتاج إلى فهمه أكثر.',
 'إذا توقف كتاب، اسأل هل ما زال مناسبًا لهدفك الحالي.',
 'اكتب ما لم تفهمه بوضوح؛ تسمية السؤال نصف طريق البحث.',
 'اجعل وقت القراءة قابلًا للتكرار في أسبوعك الواقعي.',
 'تعلم مهارة يحتاج تجربة وأخطاء ومراجعة.',
 'شارك فكرة نافعة مع من يهتم بها بعد التحقق منها.',
 'احتفظ بملخص صغير يعينك حين تعود إلى الموضوع.',
 'ابدأ من مستوى تعرفه اليوم، لا من المستوى الذي تتمناه.',
 'التقدم في القراءة يظهر أحيانًا في جودة أسئلتك.',
 'اجمع مصادر أقل وأكمل الاستفادة منها.',
 'بعد المحاضرة، اختر تطبيقًا عمليًا واحدًا لما سمعت.',
 'امنح نفسك وقتًا للتذكر قبل الرجوع إلى الإجابة.',
 'تبديل طريقة التعلم جائز حين لا تنفعك الطريقة الأولى.',
 'خصص موعدًا قصيرًا لمراجعة ما تعلمته في نهاية الأسبوع.',
 'المعرفة تنمو بالفضول والصبر والعمل المتكرر.'
 ],
 work:[
 'ابدأ بالمهمة التي تعرف أثرها ثم حدد أول خطوة فيها.',
 'الإتقان يشمل تسليم العمل في الوقت المناسب.',
 'إذا تأخرت مهمة، أعد تقدير حجمها بدل إخفائها عن نفسك.',
 'اطلب توضيح المطلوب قبل أن تبذل جهدًا في اتجاه خاطئ.',
 'قسّم وقت العمل إلى فترة تركيز ثم استراحة واعية.',
 'إنهاء مهمة واحدة اليوم يفتح مساحة ذهنية لغيرها.',
 'وثّق قرارًا مهمًا حتى تتذكر لماذا اتخذته.',
 'اعتبر المراجعة جزءًا من الإنجاز لا دليلًا على نقصه.',
 'عند التعثر، صف المشكلة في سطر قبل البحث عن الحل.',
 'اترك مساحة للظروف غير المتوقعة في خطة الأسبوع.',
 'تقدم العمل الجماعي يحتاج سؤالًا واضحًا واستماعًا جيدًا.',
 'لا تخلط كثرة الانشغال بحجم الأثر؛ راجع الأولويات.',
 'قل نعم لما تستطيع إنجازه بصدق.',
 'اجمع الملاحظات المتشابهة لتصلح السبب بدل الأعراض.',
 'احتفل بإكمال مرحلة دون انتظار نهاية المشروع كله.',
 'عندما تنخفض طاقتك، اختر مهمة صغيرة محددة النهاية.',
 'تأجيل قرار يحتاج معلومات قد يكون حكمة إذا حددت موعد العودة.',
 'اسأل عمّا يجعل تسليمك أوضح لمن سيستخدمه.',
 'اجعل آخر دقائق العمل لترتيب أول خطوة غدًا.',
 'الصبر في العمل فعل متدرج لا انتظار ساكن.'
 ],
 difficult:[
 'يحق لك أن تتوقف قليلًا وتعيد ترتيب ما يمكنك فعله الآن.',
 'ليس مطلوبًا أن تفهم كل ما حدث في يوم واحد.',
 'اطلب عون شخص تثق به إن كان الحمل أكبر من طاقتك وحدك.',
 'ما تمر به اليوم لا يحكي القصة الكاملة لأيامك القادمة.',
 'خذ القرار الأقرب والأكثر أمانًا، ثم أعد التقييم لاحقًا.',
 'اسمح لنفسك بمشاعر متغيرة دون أن تبني عليها حكمًا دائمًا.',
 'قد تكون الخطوة المناسبة اليوم أن ترتاح ثم تطلب المساندة.',
 'لا يلزمك إظهار القوة طوال الوقت كي تستحق الاحترام.',
 'إذا لم تنجز ما خططت له، راجع ما كان ممكنًا في هذه الظروف.',
 'تحدث عما يقلقك بقدر ما ترتاح له ومع من تأمنه.',
 'جرّب تقسيم المسألة إلى ما تملكه وما تحتاج فيه مساعدة.',
 'من المقبول تأجيل أمر غير عاجل حين تحتاج إلى هدوء.',
 'لا تحوّل يومًا صعبًا إلى تعريف ثابت لنفسك.',
 'وجود صعوبة لا يعني أنك أخفقت في كل شيء.',
 'حتى التحسن البطيء له مكان في قصة التعافي.',
 'خفف الضجيج حولك إن استطعت، واختر خطوة واحدة واضحة.',
 'إذا لم تنفع طريقة جربتها، يمكنك طلب طريقة أخرى.',
 'امنح نفسك حق الاعتراف بالتعب دون الاستسلام له وحدك.',
 'قد لا يتضح الحل الآن؛ تستطيع مع ذلك حماية راحتك اليوم.',
 'الرجوع إلى شخص مختص خيار عملي حين تطول المعاناة.'
 ],
 gratitude:[
 'اذكر نعمة صغيرة حدثت اليوم كما هي، دون مقارنة بغيرها.',
 'ربما كان وقت هادئ أو كلمة لطيفة شيئًا يستحق الامتنان.',
 'اشكر من ساعدك بطريقة محددة يعرف أثرها.',
 'احتفظ بلحظة فرح عادية لتعود إليها عند الحاجة.',
 'الامتنان لا يلغي وجود صعوبة تستحق العناية.',
 'اسأل نفسك: ما الذي سهّل عليّ خطوة اليوم؟',
 'وجود شخص تصارحه بما يهمك نعمة يمكن رعايتها.',
 'لاحظ شيئًا نافعًا في المكان الذي تعيش فيه.',
 'اكتب شيئًا تعلمته من مساعدة وصلتك.',
 'قد تكون القدرة على البدء مرة أخرى سببًا للشكر.',
 'امنح لحظة طعام أو راحة انتباهك بدل أن تمر سريعًا.',
 'إذا أحببت، أخبر أحد أهلك بأن وجوده يعني لك شيئًا.',
 'تقدير النعم الصغيرة يوسع انتباهك ولا يطالبك بالسعادة الدائمة.',
 'احتفظ برسالة طيبة وصلت إليك لتقرأها في يوم آخر.',
 'راجع شيئًا كان صعبًا ثم صار أسهل بفضل عون أو تدريب.',
 'انظر إلى خطوة أتممتها وشكر من أعانك فيها.',
 'خذ دقيقة لتقدير فرصة التعلم التي أتيحت لك.',
 'إذا لم تجد كلمات كثيرة، ابدأ بحمد الله على نعمة تعرفها.',
 'الامتنان فعل ملاحظة صادق، لا إنكار لما يحتاج إصلاحًا.',
 'شارك لحظة جميلة مع من تحب دون الحاجة إلى مناسبة كبيرة.'
 ]
};
const MADAR_MESSAGE_CATEGORIES={faith:'حق ربي',self:'حق نفسي',wife:'حق زوجتي',family:'حق أهلي',health:'الصحة',finance:'المالية',learning:'التعلم والقراءة',work:'العمل والإنجاز',difficult:'الأيام الصعبة',gratitude:'الامتنان'};
const MADAR_SOURCED_MESSAGES=[
 {id:'q-zumar-53',category:'faith',text:'﴿لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ﴾',source:'الزمر 39:53',url:'https://quran.com/39/53',kind:'quran'},
 {id:'q-sharh-5',category:'difficult',text:'﴿فَإِنَّ مَعَ الْعُسْرِ يُسْرًا﴾',source:'الشرح 94:5',url:'https://quran.com/94/5',kind:'quran'},
 {id:'q-baqara-286',category:'self',text:'﴿لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا﴾',source:'البقرة 2:286',url:'https://quran.com/2/286',kind:'quran'},
 {id:'h-bukhari-6465',category:'faith',text:'«أَدْوَمُهَا وَإِنْ قَلَّ»',source:'صحيح البخاري 6465، جواب النبي ﷺ عن أحب الأعمال إلى الله',url:'https://sunnah.com/bukhari:6465',kind:'hadith'},
 {id:'h-bukhari-1968',category:'self',text:'«وَلِنَفْسِكَ عَلَيْكَ حَقًّا، وَلِأَهْلِكَ عَلَيْكَ حَقًّا»',source:'قول سلمان رضي الله عنه، أقرّه النبي ﷺ؛ صحيح البخاري 1968',url:'https://sunnah.com/bukhari:1968',kind:'hadith'}
];
const MADAR_MESSAGES=Object.entries(MADAR_MESSAGE_SEEDS).flatMap(([category,lines])=>lines.map((text,i)=>({id:`md-${category}-${String(i+1).padStart(2,'0')}`,category,text,kind:'original'}))).concat(MADAR_SOURCED_MESSAGES);

// Add sourced narratives without changing or replacing any pre-existing story.
MADAR_STORIES.push(
 {id:'salman-balance',title:'سلمان وحقوق النفس والأهل',kind:'faith',ref:'صحيح البخاري 1968',url:'https://sunnah.com/bukhari:1968',teaser:'ذكّر سلمان أبا الدرداء بالتوازن في حق الرب والنفس والأهل.',body:'زار سلمان الفارسي أبا الدرداء، ولاحظ انشغاله بعبادة أهمل معها حق نفسه وأهله. ذكّره بأن للرب وللنفس وللأهل حقوقًا، وحين أُخبر النبي ﷺ قال إن سلمان قد صدق. الدرس العملي: رتّب عبادتك ومسؤولياتك بحيث تؤدي كل حق بقدر استطاعتك.'},
 {id:'kab-truth',title:'صدق كعب بن مالك',kind:'faith',ref:'صحيح البخاري 4418',url:'https://sunnah.com/bukhari:4418',teaser:'اختار أن يصدق بشأن تخلفه ثم ثبت حتى جاء خبر توبته.',body:'روى كعب بن مالك قصة تخلفه عن تبوك. كان يستطيع اختلاق عذر لكنه صدق، ومرّ بفترة صعبة حتى نزلت آيات التوبة. الدرس العملي: حين تخطئ، قل الحقيقة وخذ مسؤولية الإصلاح، ولا تبحث عن مخرج بالكذب.'},
 {id:'luqman-advice',title:'نصيحة لقمان لابنه',kind:'faith',ref:'سورة لقمان 31:13–19',url:'https://quran.com/31/13-19',teaser:'جمع بين التوحيد وبر الوالدين والصلاة وحسن الخلق.',body:'تعرض سورة لقمان وصايا لقمان لابنه: عبادة الله، والرفق بالوالدين، وإقامة الصلاة، والصبر، والتواضع في التعامل والصوت. الدرس العملي: اختر خلقًا واحدًا من هذه المعاني لتتمرن عليه مع أهل بيتك هذا الأسبوع.'},
 {id:'dhul-qarnayn-work',title:'ذو القرنين والعمل مع الناس',kind:'faith',ref:'سورة الكهف 18:83–98',url:'https://quran.com/18/83-98',teaser:'استعمل الأسباب والناس لبناء سد يحميهم.',body:'تروي سورة الكهف أن ذا القرنين استجاب لقوم طلبوا العون، وطلب منهم أن يعينوه بقوتهم في بناء الردم. لم تكن المعالجة وعدًا مجردًا؛ كانت عملًا منظمًا بما توفر من وسائل. الدرس العملي: اطلب المشاركة وحدد الموارد قبل بدء مشروع كبير.'}
);

let madarMessageCategory='all',madarMessageSearch='',madarMessageOnlyFavorites=false,madarMessageLimit=12,madarMessageCurrent=null;
function madarMessagePrefs(){const raw=D.settings.messageLibrary||{};return {favorites:Array.isArray(raw.favorites)?[...new Set(raw.favorites.filter(id=>MADAR_MESSAGES.some(m=>m.id===id)))]:[],recent:Array.isArray(raw.recent)?raw.recent.filter(id=>MADAR_MESSAGES.some(m=>m.id===id)).slice(-40):[],morning:raw.morning===true,evening:raw.evening===true,success:raw.success===true};}
function madarMessageSave(p){D.settings.messageLibrary=p;save()}
function madarMessageHash(key){let h=2166136261;for(const c of key)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;return h}
function madarMessageDaily(slot='day',date=today()){const pool=MADAR_MESSAGES.filter(m=>m.kind==='original'),day=Math.floor(Date.parse(date+'T12:00:00Z')/86400000),offset={day:0,morning:67,evening:131}[slot]||0;return pool[((day*37+offset)%pool.length+pool.length)%pool.length]}
function madarMessagePick(category='all'){const p=madarMessagePrefs(),pool=MADAR_MESSAGES.filter(m=>category==='all'||m.category===category),recent=new Set(p.recent.slice(-Math.min(35,Math.max(0,pool.length-1)))),options=pool.filter(m=>!recent.has(m.id)),picked=options[Math.floor(Math.random()*options.length)]||pool[0];if(picked){p.recent=[...p.recent,picked.id].slice(-40);madarMessageSave(p)}return picked}
function madarMessageCard(m){if(!m)return '';const favored=madarMessagePrefs().favorites.includes(m.id);return `<article class="card" data-message="${esc(m.id)}"><small>${esc(MADAR_MESSAGE_CATEGORIES[m.category])}${m.kind==='original'?' · صياغة أصلية':` · ${esc(m.source)}`}</small><p>${esc(m.text)}</p>${m.url?`<a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">المصدر</a>`:''}<div class="actions">${btn(favored?'♥ محفوظة':'♡ حفظ','madar-message-favorite',m.id)}${btn('مشاركة','madar-message-share',m.id)}</div></article>`}
function madarMessageDailyCard(){const date=today(),p=madarMessagePrefs(),hour=new Date().getHours(),slot=p.morning&&hour>=6&&hour<12?'morning':p.evening&&hour>=18&&hour<22?'evening':'day',label=slot==='morning'?'رسالة الصباح':slot==='evening'?'رسالة المساء':'رسالة اليوم',m=madarMessageDaily(slot,date);return `<section class="card" aria-label="${label}"><h2>${label}</h2><p>${esc(m.text)}</p><div class="actions">${btn('عبارات وقصص','madar-message-open')}${btn('♡ حفظ','madar-message-favorite',m.id)}</div></section>`}
function madarMessageRows(){const q=madarMessageSearch.trim().toLocaleLowerCase('ar'),fav=new Set(madarMessagePrefs().favorites),rows=MADAR_MESSAGES.filter(m=>(madarMessageCategory==='all'||m.category===madarMessageCategory)&&(!madarMessageOnlyFavorites||fav.has(m.id))&&(!q||(m.text+' '+MADAR_MESSAGE_CATEGORIES[m.category]+' '+(m.source||'')).toLocaleLowerCase('ar').includes(q)));return (rows.length?rows.slice(0,madarMessageLimit).map(madarMessageCard).join(''):'<p class="muted">لا توجد عبارة تطابق اختيارك.</p>')+(rows.length>madarMessageLimit?`<div class="actions">${btn('عرض المزيد','madar-message-more')}</div>`:'')}
function madarMessagePanel(){const p=madarMessagePrefs(),m=madarMessageCurrent||madarMessageDaily();return `<section class="card" id="madarMessageLibrary"><h2>رسالة اليوم · مكتبة العبارات</h2><p class="muted">${num(MADAR_MESSAGES.length)} عبارة، منها نصوص موثقة بمصادرها. اختياراتك ومفضلتك خاصة بهذا الجهاز وحسابك. عبارات الصباح والمساء تظهر داخل التطبيق عند فتحه في وقتها، ولا تُنشئ إشعارات إضافية.</p>${madarMessageCard(m)}<div class="actions">${btn('عبارة أخرى','madar-message-next')}</div><label class="togglelabel"><input type="checkbox" id="madarMessageMorning" ${p.morning?'checked':''}>رسالة صباحية عند فتح التطبيق</label><label class="togglelabel"><input type="checkbox" id="madarMessageEvening" ${p.evening?'checked':''}>رسالة مسائية عند فتح التطبيق</label><label class="togglelabel"><input type="checkbox" id="madarMessageSuccess" ${p.success?'checked':''}>عبارة إضافية عند الإنجاز</label><p class="muted">عدد إشعارات الطمأنينة اليومية وأوقات الهدوء يُضبطان من إعدادات الإشعارات القائمة أعلاه.</p><label>الفئة<select id="madarMessageCategory"><option value="all">كل الفئات</option>${Object.entries(MADAR_MESSAGE_CATEGORIES).map(([id,label])=>`<option value="${id}" ${madarMessageCategory===id?'selected':''}>${label}</option>`).join('')}</select></label><label class="togglelabel"><input id="madarMessageFavorites" type="checkbox" ${madarMessageOnlyFavorites?'checked':''}>المفضلة فقط</label><label>بحث في العبارات<input id="madarMessageSearch" type="search" value="${esc(madarMessageSearch)}" placeholder="ابحث بكلمة أو موضوع"></label><div id="madarMessageRows" class="harvestGrid">${madarMessageRows()}</div></section>`}
const madarOldStoriesPage=harvestStoriesPage;harvestStoriesPage=function(){return madarOldStoriesPage().replace('<div id="harvestStoryCards"',madarMessagePanel()+'<div id="harvestStoryCards"')};
const madarOldHome=home;home=function(){return madarOldHome()+madarMessageDailyCard()};
const madarOldEncouragement=queueEncouragement;queueEncouragement=function(kind){madarOldEncouragement(kind);if(!madarMessagePrefs().success||D.settings.successMessages===false)return;const category={tasks:'work',money:'finance',workout:'health',book:'learning',habit:'self',goal:'self',win:'gratitude'}[kind];if(category){const message=madarMessagePick(category);setTimeout(()=>{if(storageOK&&!pendingExternal)toast('✦ '+message.text)},1800)}};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-act^="madar-message-"]');if(!b)return;const act=b.dataset.act,id=b.dataset.id,m=MADAR_MESSAGES.find(x=>x.id===id);switch(act){case'madar-message-open':go('stories');break;case'madar-message-next':madarMessageCurrent=madarMessagePick(madarMessageCategory);render();break;case'madar-message-more':madarMessageLimit+=12;$('#madarMessageRows').innerHTML=madarMessageRows();break;case'madar-message-favorite':if(!m)return;{const p=madarMessagePrefs();p.favorites=p.favorites.includes(id)?p.favorites.filter(x=>x!==id):[...p.favorites,id];madarMessageSave(p);render()}break;case'madar-message-share':if(!m)return;try{if(navigator.share)await navigator.share({text:m.text+(m.url?'\n'+m.url:'')});else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(m.text+(m.url?'\n'+m.url:''));toast('نُسخت العبارة للمشاركة.')}else toast('المشاركة غير متاحة في هذا المتصفح.',true)}catch(err){if(err.name!=='AbortError')toast('تعذرت المشاركة؛ حاول مجددًا.',true)}break}});
document.addEventListener('change',e=>{const el=e.target,p=madarMessagePrefs();if(el.id==='madarMessageCategory'){madarMessageCategory=el.value;madarMessageLimit=12;$('#madarMessageRows').innerHTML=madarMessageRows()}else if(el.id==='madarMessageFavorites'){madarMessageOnlyFavorites=el.checked;madarMessageLimit=12;$('#madarMessageRows').innerHTML=madarMessageRows()}else if(['madarMessageMorning','madarMessageEvening','madarMessageSuccess'].includes(el.id)){p[{madarMessageMorning:'morning',madarMessageEvening:'evening',madarMessageSuccess:'success'}[el.id]]=el.checked;madarMessageSave(p);render()}});
document.addEventListener('input',e=>{if(e.target.id==='madarMessageSearch'){madarMessageSearch=e.target.value;madarMessageLimit=12;$('#madarMessageRows').innerHTML=madarMessageRows()}});
