# RepRise Image Sourcing Guide

**Created:** December 30, 2025  
**Purpose:** Curated list of high-quality, free stock photos for RepRise platform

---

## 🎯 Where to Get Images

### **Primary Source: Pexels** (Recommended)
- ✅ 600,000+ personal trainer photos available
- ✅ Completely free, no attribution required
- ✅ High quality, diverse representation
- 🔗 [Pexels Personal Trainer Search](https://www.pexels.com/search/personal%20trainer/)
- 🔗 [Pexels Diverse Fitness Search](https://www.pexels.com/search/diverse%20fitness/)

### **Secondary Source: Unsplash**
- ✅ 1,100+ personal trainer photos
- ✅ Free for commercial use
- ✅ Slightly more artistic/editorial style
- 🔗 [Unsplash Personal Trainer Search](https://unsplash.com/s/photos/personal-trainer)
- 🔗 [Unsplash Fitness Coach Search](https://unsplash.com/s/photos/fitness-coach)

---

## 📸 What Images You Need

### 1. **Trainer Headshots/Portraits** (Priority 1)
**Quantity Needed:** 10-15 diverse trainer photos  
**Specifications:**
- Professional looking, confident expression
- Good lighting (studio or gym setting)
- Clear face/upper body visible
- Diverse age, gender, ethnicity, body types
- Athletic wear or professional casual
- Square/portrait orientation (1:1 or 3:4 ratio)
- Minimum 800x800px (higher is better)

**Search Terms on Pexels/Unsplash:**
- "personal trainer portrait"
- "fitness coach professional"
- "athletic trainer headshot"
- "gym instructor confident"
- "diverse fitness professional"

**Specific Recommended Images from Pexels:**

1. **Male Trainer in Pink Shirt** (Athletic Black man)
   - Pexels ID: 733500
   - URL: `https://www.pexels.com/photo/man-wearing-orange-nike-crew-neck-t-shirt-733500/`
   - Download: Direct JPG link available
   - Great for: Approachable, confident look

2. **Man in Boxing Gym** (Under blue neon lights)
   - Pexels ID: 3912944
   - URL: `https://www.pexels.com/photo/man-in-black-crew-neck-t-shirt-3912944/`
   - Great for: Modern, edgy trainer vibe

3. **Smiling Gym Trainer** (In front of boxing gloves)
   - Pexels ID: 3912953
   - URL: `https://www.pexels.com/photo/man-in-black-crew-neck-t-shirt-standing-in-front-of-boxing-gloves-3912953/`
   - Great for: Friendly, welcoming energy

4. **Female Trainer with Kettlebell**
   - Pexels ID: 416778
   - URL: `https://www.pexels.com/photo/woman-exercising-416778/`
   - Great for: Strong, empowered female trainer

5. **Woman with Abs** (Fitness model)
   - Pexels ID: 136409
   - URL: `https://www.pexels.com/photo/woman-showing-her-abs-136409/`
   - Great for: Results-focused trainer

6. **Man with Battle Ropes**
   - Pexels ID: 28080
   - URL: `https://www.pexels.com/photo/woman-holding-exercise-ropes-28080/`
   - Great for: High-intensity training specialist

**How to Download:**
1. Visit the Pexels URL
2. Click "Free Download" button
3. Select "Original" size for best quality
4. Save to `/public/images/trainers/` folder
5. Rename files descriptively: `trainer-portrait-01.jpg`, `trainer-portrait-02.jpg`, etc.

---

### 2. **Hero Section Image** (Priority 2)
**Quantity Needed:** 1-2 inspiring fitness images  
**Specifications:**
- Wide landscape format (16:9 or wider)
- High resolution (1920x1080px minimum)
- Motivational/aspirational feeling
- Not too busy (needs to work with overlay text)
- Diverse representation

**Search Terms:**
- "fitness motivation hero"
- "gym workout wide shot"
- "training session inspirational"
- "athlete workout landscape"

**Recommended Pexels Images:**

1. **Women Planking at Seashore** (Outdoor fitness)
   - Pexels ID: 1199607
   - URL: `https://www.pexels.com/photo/two-women-planking-at-the-seashore-1199607/`
   - Perfect for: Aspirational, outdoor fitness vibe

2. **Gym Energy Shot** (Active environment)
   - Pexels ID: 703016
   - URL: `https://www.pexels.com/photo/10-lb-rogue-weight-plate-near-people-gathered-703016/`
   - Perfect for: Community, gym atmosphere

---

### 3. **Training Session Action Shots** (Priority 3)
**Quantity Needed:** 5-8 diverse workout images  
**Specifications:**
- Trainer working with client
- Various training styles (weights, yoga, cardio, HIIT)
- Dynamic action, not static poses
- Good for cards/thumbnails

**Recommended Images:**

1. **Personal Trainer Assisting Stretch**
   - Pexels ID: 4056723
   - URL: `https://www.pexels.com/photo/photo-of-women-stretching-together-4056723/`

2. **Yoga Instructor Helping Student**
   - Pexels ID: 4057112
   - URL: `https://www.pexels.com/photo/photo-of-a-trainer-supporting-a-girl-do-bending-exercise-4057112/`

3. **Boxing Training Session**
   - Pexels ID: 1544774
   - URL: `https://www.pexels.com/photo/woman-punching-the-hand-of-man-wearing-training-gloves-1544774/`

4. **Weight Training with Spotter**
   - Pexels ID: 2204196
   - URL: `https://www.pexels.com/photo/man-lying-while-doing-barbell-2204196/`

---

## 🎨 Image Processing Tips

### After Downloading:

1. **Optimize for Web**
   - Use tools like TinyPNG or Squoosh.app to compress
   - Target: 100-300KB for portraits, 200-500KB for hero images
   - Format: JPEG for photos (WebP as fallback)

2. **Naming Convention**
   ```
   /public/images/trainers/
     - trainer-portrait-01-sarah-johnson.jpg
     - trainer-portrait-02-mike-chen.jpg
     - trainer-portrait-03-alex-rivera.jpg
   
   /public/images/hero/
     - hero-main-workout.jpg
     - hero-training-session.jpg
   
   /public/images/sessions/
     - session-yoga.jpg
     - session-strength.jpg
     - session-cardio.jpg
   ```

3. **Create Multiple Sizes** (Optional but Recommended)
   - Original (1200x1200px)
   - Thumbnail (400x400px)
   - Mobile (600x600px)
   - Next.js will auto-optimize, but pre-sized helps

---

## 📋 Download Checklist

### Phase 1: Essential Images (Do First)
- [ ] 5 diverse trainer headshots
- [ ] 1 hero image for homepage
- [ ] 3 training session action shots

### Phase 2: Enhancement (Do Next)
- [ ] 10 total trainer headshots
- [ ] 2 hero image variations
- [ ] 8 training session shots (cover all specialties)

### Phase 3: Polish (Optional)
- [ ] Category/specialty icons
- [ ] Badge/certification images
- [ ] Facility/gym photos for location pages

---

## 🚀 Quick Start Instructions

1. **Visit Pexels.com**
2. **Search "personal trainer"**
3. **Download 5 diverse headshots** (use IDs above as starting point)
4. **Save to `/public/images/trainers/`**
5. **Download 1 hero image** (wide landscape)
6. **Save to `/public/images/hero/`**
7. **Run the app** - images will auto-load via Next.js Image component

---

## ⚖️ Legal/Licensing

All Pexels and Unsplash images are:
- ✅ **Free for commercial use**
- ✅ **No attribution required** (though appreciated)
- ✅ **Can be modified/edited**
- ✅ **Safe for portfolio projects**

**License Reference:**
- [Pexels License](https://www.pexels.com/license/)
- [Unsplash License](https://unsplash.com/license)

---

## 📞 Support Resources

- **Pexels Help:** https://help.pexels.com/
- **Unsplash Help:** https://help.unsplash.com/
- **Image Compression:** https://tinypng.com/
- **Next.js Image Docs:** https://nextjs.org/docs/app/api-reference/components/image

---

**Next Steps After Downloading:**
1. Update components to use real images (see updated `TrainerProfile.tsx`)
2. Apply design system colors
3. Test image loading performance
4. Add proper alt text for accessibility
