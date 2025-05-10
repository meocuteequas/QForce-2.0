'use server'

import { revalidatePath } from 'next/cache'
import { getTranslations, getLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { redirect } from 'next/navigation'

// Create validation schema for the form data
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

interface LoginResult {
  success: boolean
  error?: string
}

export async function login(formData: FormData): Promise<LoginResult> {
  const supabase = await createClient()
  const locale = await getLocale()
  const t = await getTranslations('login.errors')

  try {
    // Extract form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Validate form data
    const result = loginSchema.safeParse({ email, password })
    
    if (!result.success) {
      return {
        success: false,
        error: t('invalidFormat')
      }
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Return translated error message based on error type
      if (error.message.includes('Invalid login credentials')) {
        return {
          success: false,
          error: t('invalidCredentials')
        }
      }
      
      return {
        success: false,
        error: t('serverError')
      }
    }

    revalidatePath(`/${locale}/dashboard`, 'layout')
    redirect(`/${locale}/dashboard`)
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: t('generic')
    }
  }
}

export async function signup(formData: FormData): Promise<LoginResult> {
  const supabase = await createClient()
  const locale = await getLocale()
  const t = await getTranslations('login.errors')

  try {
    // Extract form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Validate form data
    const result = loginSchema.safeParse({ email, password })
    
    if (!result.success) {
      return {
        success: false,
        error: t('invalidFormat')
      }
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: t('serverError')
      }
    }

    revalidatePath(`/${locale}/dashboard`, 'layout')
    redirect(`/${locale}/dashboard`)
    return { success: true }
  } catch (error) {
    console.error('Signup error:', error)
    return {
      success: false,
      error: t('generic')
    }
  }
}