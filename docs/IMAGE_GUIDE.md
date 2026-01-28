# RepRise - Quick Image Reference

**All images are loaded from Pexels CDN - They work immediately!**

---

## ✅ Images Are Already Working

The site now uses direct URLs from Pexels. No downloads needed! All images are configured in `/src/config/images.ts`

---

## 📸 Image Catalog

### Trainer Profile Images (10 diverse trainers)

| ID | Description | Preview URL |
|----|-------------|-------------|
| t1 | Athletic Black Man - Pink Shirt | `https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg` |
| t2 | Smiling Gym Trainer - Boxing Gloves Wall | `https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg` |
| t3 | Gym Trainer - Blue Neon Lights | `https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg` |
| t4 | Male Trainer - Red Shorts | `https://images.pexels.com/photos/1144864/pexels-photo-1144864.jpeg` |
| t5 | Boxing Trainer - Ring Setting | `https://images.pexels.com/photos/3912516/pexels-photo-3912516.jpeg` |
| t6 | Female Trainer - Kettlebell | `https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg` |
| t7 | Female Trainer - Abs Focus | `https://images.pexels.com/photos/136409/pexels-photo-136409.jpeg` |
| t8 | Female Trainer - Grey Sports Bra | `https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg` |
| t9 | Female Trainer - Smiling on Mat | `https://images.pexels.com/photos/3757645/pexels-photo-3757645.jpeg` |
| t10 | Female Trainer - Red Mat Relaxed | `https://images.pexels.com/photos/3757947/pexels-photo-3757947.jpeg` |

### Hero/Banner Images (3 inspirational)

| Type | Description | URL |
|------|-------------|-----|
| main | Women Planking - Seashore | `https://images.pexels.com/photos/1199607/pexels-photo-1199607.jpeg` |
| gym | Gym Energy - Active Environment | `https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg` |
| outdoor | Outdoor Training Session | `https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg` |

### Session Type Images (8 workout types)

| Type | Description | URL |
|------|-------------|-----|
| yoga | Women Doing Yoga - Studio | `https://images.pexels.com/photos/3822668/pexels-photo-3822668.jpeg` |
| strength | Weight Training with Spotter | `https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg` |
| cardio | Woman with Battle Ropes | `https://images.pexels.com/photos/28080/pexels-photo.jpg` |
| boxing | Boxing Training Session | `https://images.pexels.com/photos/1544774/pexels-photo-1544774.jpeg` |
| stretching | Yoga Instructor Helping | `https://images.pexels.com/photos/4057112/pexels-photo-4057112.jpeg` |
| training | Personal Training Session | `https://images.pexels.com/photos/4662336/pexels-photo-4662336.jpeg` |
| weightlifting | Man Deadlifting | `https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg` |
| pushups | Man Doing Push-ups | `https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg` |

### Category Images (4 fitness goals)

| Category | Description | URL |
|----------|-------------|-----|
| weightLoss | Woman Strength Training | `https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg` |
| muscleGain | Muscle Building Training | `https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg` |
| flexibility | Yoga Flexibility | `https://images.pexels.com/photos/3822668/pexels-photo-3822668.jpeg` |
| endurance | Endurance Training | `https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg` |

---

## 🎯 How Images Are Used

### TrainerAvatar Component
```tsx
<TrainerAvatar 
  trainerId="t1" 
  trainerName="Sarah Johnson" 
  size="lg"
/>
```

### Hero Section (Homepage)
```tsx
import { getHeroImage } from '@/config/images'

<Image
  src={getHeroImage('main')}
  alt="Fitness training"
  fill
  className="object-cover"
/>
```

### Session Cards
```tsx
import { getSessionImage } from '@/config/images'

<Image
  src={getSessionImage('yoga')}
  alt="Yoga session"
  width={400}
  height={300}
/>
```

---

## ⚙️ Image Configuration

All images are configured in:
```
/src/config/images.ts
```

Helper functions available:
- `getTrainerImage(trainerId)` - Get trainer photo
- `getHeroImage(type)` - Get hero banner
- `getSessionImage(sessionType)` - Get workout type image  
- `getCategoryImage(category)` - Get goal category image

---

## 🔧 Adding More Images

### 1. Find New Images on Pexels
Visit: https://www.pexels.com/search/personal%20trainer/

### 2. Get Direct URL
Right-click image → Copy image address
Format: `https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=800`

### 3. Add to Config
Edit `/src/config/images.ts`:
```typescript
export const TRAINER_IMAGES = {
  // ... existing images
  t11: 'https://images.pexels.com/photos/YOUR-NEW-IMAGE.jpeg?auto=compress&cs=tinysrgb&w=800',
}
```

---

## 📝 License

All Pexels images are:
- ✅ Free for commercial use
- ✅ No attribution required
- ✅ Modification allowed
- ✅ Safe for portfolio projects

License: https://www.pexels.com/license/

---

## 🚀 Performance

- Images served from Pexels CDN (fast, global)
- Next.js automatic optimization
- Lazy loading for off-screen images
- Responsive sizes (auto-scaled for device)
- WebP format support

---

## 🎨 Image Sizes Used

- **Trainers**: 800px width (avatars)
- **Heroes**: 1920px width (full banners)
- **Sessions**: 800px width (cards)
- **Categories**: 600px width (thumbnails)

Pexels `auto=compress&cs=tinysrgb` handles optimization automatically!
