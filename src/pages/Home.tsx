// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
    // ===============================================
    // كود JavaScript لدمج الأنيميشن وتفعيل تأثيرات الظهور
    // ===============================================
    useEffect(() => {
        
        // 1. تحديد تنسيقات CSS والأنيميشن (keyframes) المطلوبة
        const animationStyles = `
            /* الإعدادات الأولية للعناصر التي سيتم كشفها */
            .hero-section,
            .mission-section,
            .programs-section,
            .contact-section,
            .program-card {
                opacity: 0; 
                transform: translateY(20px); 
                transition: opacity 0.6s ease-out, transform 0.6s ease-out; 
            }

            /* الحالة المرئية (Visible State) - يتم تطبيقها عبر JS */
            .visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Keyframes لأنيميشن البطاقات (fadeInUp) */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        // 2. إنشاء وسم <style> وحقنه في رأس المستند (head)
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = animationStyles;
        document.head.appendChild(styleElement);
        
        
        // 3. تفعيل تأثيرات Scroll Reveal بواسطة Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // تفعيل التأثير التدريجي لبطاقات البرامج
                    if (entry.target.classList.contains('programs-section')) {
                        const cards = entry.target.querySelectorAll('.program-card');
                        cards.forEach((card, index) => {
                            // يقوم هذا السطر بتشغيل الـ @keyframes fadeInUp الذي تم حقنه أعلاه
                            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2 + 0.3}s forwards`;
                            card.classList.add('visible'); 
                        });
                    }
                }
            });
        }, {
            threshold: 0.1 
        });

        document.querySelectorAll('section, .program-card').forEach(section => {
            observer.observe(section);
        });

        // 4. تعديل روابط شريط التنقل للتمرير السلس
        document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.length > 1 && targetId !== '#') {
                    e.preventDefault();
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 5. وظيفة التنظيف: إزالة وسم الـ <style> عند إزالة المكون من الصفحة
        return () => {
             observer.disconnect();
             styleElement.remove();
        };

    }, []);


    return (
        // تم تعيين الاتجاه RTL بشكل صحيح في العنصر الأب
        <div dir="rtl" className="min-h-screen bg-white text-slate-800">

            {/* ============== الرأس وشريط التنقل (Header) ============== */}
            <header className="bg-[#0A3D62] text-white py-4 shadow-xl fixed w-full z-20">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold tracking-wider">مدرسة النبي اليتيم</h1>
                    <nav className="space-x-6 space-x-reverse hidden md:flex">
                        <a href="#about" className="hover:text-[#2e86de] transition duration-200">رسالتنا</a>
                        <a href="#programs" className="hover:text-[#2e86de] transition duration-200">برامجنا</a>
                        <a href="#contact" className="hover:text-[#2e86de] transition duration-200">اتصل بنا</a>
                        {/* رابط التسجيل الفعلي — تم تغييره إلى Link */}
                        <Link to="/login" className="bg-[#2e86de] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#2471c4] transition shadow-md">التسجيل</Link>
                    </nav>
                </div>
            </header>

            <main className="pt-20"> {/* إضافة مسافة علوية لتجنب تغطية الشريط الثابت */}
                
                {/* ============== قسم الترحيب الرئيسي (Hero) - تم تحسين التصميم RTL والخلفية ============== */}
                <section className="hero-section py-20 bg-gray-50 border-b border-gray-200">
                    {/* استخدام flex-row-reverse لضمان أن النص يظهر على اليمين في RTL */}
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center flex-row-reverse">
                        
                        {/* النص (يظهر على اليمين) */}
                        <div className="hero-text animate-fade-in-up">
                            <h2 className="text-5xl font-extrabold leading-tight mb-4 text-[#0A3D62]">
                                مدرسة النبي اليتيم: حيث نبني <span className="text-[#2e86de] border-b-4 border-[#2e86de]">قادة المستقبل</span> برعاية ودفء.
                            </h2>
                            <p className="text-xl text-slate-600 mb-8">
                                انطلاقاً من شعارنا "مرضاة ربنا، صحبة نبينا، خدمة وطننا"، نكفل تربوياً واجتماعياً لنرسم البسمة ونغرس الطمأنينة في نفوس أبنائنا.
                            </p>
                            
                            {/* رابط الانضمام الفعلي — تم تغييره إلى Link */}
                            <Link to="/login" className="px-8 py-3 rounded-full bg-[#2e86de] text-white text-lg font-semibold shadow-lg hover:bg-[#2471c4] transition transform hover:scale-105">انضم لنا الآن</Link>
                        </div>

                        {/* الصورة (تظهر على اليسار) */}
                        <div className="hero-image-container order-first md:order-none">
                            <img src="https://image.pollinations.ai/prompt/a%2014-year-old%20boy%20student%20holding%20books%20and%20wearing%20glasses%20in%20a%20school%20library?width=1024&height=1024&seed=225" 
                                 alt="طالب بعمر 14 سنة يحمل كتباً ويرتدي نظارة" 
                                 className="rounded-3xl shadow-2xl w-full object-cover border-4 border-[#0A3D62]" />
                        </div>
                        
                    </div>
                </section>


                {/* ============== قسم رسالتنا (About) - خلفية بيضاء ============== */}
                <section id="about" className="mission-section py-20 bg-white">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h3 className="text-4xl font-extrabold mb-6 text-[#0A3D62]">🎯 أكثر من 16 عامًا من العطاء: رسالتنا</h3>
                        <p className="text-xl text-slate-700 leading-9 mb-6">
                            تأسست جمعية كافل اليتيم الولائية تيارت وهدفنا الأسمى هو **رعاية أبنائنا وبناتنا من الأيتام وكفالتهم تربوياً واجتماعياً** قصد رسم البسمة وإدخال السعادة والطمأنينة بنفوسهم.
                        </p>
                        <p className="text-2xl font-extrabold text-[#2e86de] mt-6 italic">شعارنا: "مرضاة ربنا، صحبة نبينا، خدمة وطننا"</p>
                    </div>
                </section>


                {/* ============== قسم برامجنا (Programs) - خلفية رمادية ============== */}
                <section id="programs" className="programs-section py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-4xl font-extrabold mb-12 text-center text-[#0A3D62]">✨ برامجنا التخصصية: بناء الشخصية والتفوق العلمي</h3>
                        <div className="program-grid grid md:grid-cols-3 gap-8">
                            
                            <div className="program-card bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#2e86de] transition duration-400 hover:shadow-2xl hover:border-b-4">
                                <h4 className="text-2xl font-bold mb-3 text-[#0A3D62] border-b pb-2">النشاط التربوي</h4>
                                <p className="text-slate-600 mt-4">توفير البيئة التعليمية الممتازة والتوجيه الأكاديمي، لضمان نشأة سليمة ومستقبل مشرق.</p>
                            </div>
                            
                            <div className="program-card bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#2e86de] transition duration-400 hover:shadow-2xl hover:border-b-4">
                                <h4 className="text-2xl font-bold mb-3 text-[#0A3D62] border-b pb-2">النشاط الاجتماعي</h4>
                                <p className="text-slate-600 mt-4">برامج لتطوير العلاقات الاجتماعية واكتساب الخبرات التي تساهم في بناء شخصيتهم وتحقيق ذواتهم.</p>
                            </div>
                            
                            <div className="program-card bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#2e86de] transition duration-400 hover:shadow-2xl hover:border-b-4">
                                <h4 className="text-2xl font-bold mb-3 text-[#0A3D62] border-b pb-2">النشاط العلمي</h4>
                                <p className="text-slate-600 mt-4">اكتشاف قدرات وميولات أبنائنا العلمية وتنميتها وتوجيهها لخدمة المجتمع والفرد بأفضل شكل.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============== قسم التواصل (Contact) - خلفية زرقاء داكنة ============== */}
                <section id="contact" className="contact-section bg-[#0A3D62] text-white py-20">
                    <div className="container mx-auto px-4">
                        <h3 className="text-4xl font-extrabold mb-12 text-center text-white">📞 للتواصل والدعم</h3>
                        
                        <div className="contact-content flex flex-col lg:flex-row gap-12 items-start">
                            <div className="contact-details lg:w-1/2">
                                <p className="mb-4 text-lg"><strong>العنوان:</strong> حي دبي، عمارة 04 ب، المدخل 05، تيارت، الرمز البريدي 14000</p>
                                <p className="mb-4 text-lg"><strong>البريد الإلكتروني:</strong> <a href="mailto:kafilyatim-t@hotmail.com" className="text-[#2e86de] font-semibold hover:underline">kafilyatim-t@hotmail.com</a></p>
                                <p className="mb-8 text-lg"><strong>الهاتف:</strong> 0771594343</p>
                                
                                {/* زر الموقع/الخريطة - الرابط صار يفتح خرائط غوغل مع مسار الذهاب */}
                                <a 
                                    href="https://www.google.com/maps/dir/?api=1&destination=35.34686064827144,1.337301025381165&travelmode=driving"
                                    target="_blank" 
                                    className="px-8 py-3 rounded-full bg-[#2e86de] text-white text-lg font-semibold shadow-xl hover:bg-[#2471c4] transition transform hover:scale-105"
                                    rel="noopener noreferrer"
                                >
                                    اذهب للموقع
                                </a>
                            </div>
                            
                            <div className="contact-map lg:w-1/2 w-full h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-[#2e86de]">
                                <iframe
                                  title="map"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.353!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0JDQvtGB0YLQstCw0Y8g0LI!5e0!3m2!1sar!2sdz!4v0000000000000"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============== خريطة الموقع (في آخر الصفحة) ============== */}
                <section id="location-map" className="py-12 bg-white">
                  <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-6 text-center text-[#0A3D62]">موقعنا على الخريطة</h3>
                    <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-[#2e86de]">
                      <iframe
                        title="map-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.3539762859864!2d1.337301025381165!3d35.34686064827144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1286d19df50dbbb1%3A0xbdf0374525e632a3!2z2YXYr9ix2LPYqSDYp9mE2YbYqNmKINin2YTZitiq2YrZhSAiINis2YXYudmK2Kkg2YPYp9mB2YQg2KfZhNmK2KrZitmFINin2YTZiNmE2KfYptmK2Kkg2KrZitin2LHYqg!5e0!3m2!1sar!2sdz!4v1762050798554!5m2!1sar!2sdz"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </section>

            </main>
        </div>
    );
}

export default Home;

