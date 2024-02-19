'use client'

import { HomeComponent } from '@/components/HomeComponent'
import { useAuthService } from '@/resources/users/authentication.service'
import LoginPage from './login/page';
import GaleryPage from './galery/page';

export default function Home() {
  const authService = useAuthService();
  const user = authService.getUserSession();

  if (!user) {
    return (
      <div>
        <LoginPage></LoginPage>
      </div>)
  } else {
    return (
      <div>
        <GaleryPage></GaleryPage>
      </div>)
  }

  return (
    <main>
      <div>
        <HomeComponent message='Some message'></HomeComponent>
      </div>
    </main>
  )
}
