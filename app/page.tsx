'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { genderOptions, salaryRanges, turkishCities, unemploymentDurations, applicationCountRanges, interviewCountRanges, departmentOptions, positionOptions, cvPreferences, workModelPreferences, platformPreferences, dailyApplicationCount, unemploymentChallenges, bootcampExperienceQuestions, gpaOptions } from '@/constants/formOptions'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import IntroAnimation from './components/IntroAnimation'
import { getAgreementLabel, getFieldLabel, getSatisfactionLabel } from '@/constants'

export default function Home() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6
  const [formData, setFormData] = useState({
    gender: '',
    graduationDate: '',
    gpa: '',
    desiredPosition: '',
    expectedSalary: '',
    unemploymentDuration: '',
    totalApplications: '',
    interviewCount: '',
    location: '',
    jobListingsSatisfaction: '',
    jobMatchSatisfaction: '',
    responseTimeSatisfaction: '',
    hiringProcessSatisfaction: '',
    requirementsSatisfaction: '',
    feedbackSatisfaction: '',
    hrCommunicationSatisfaction: '',
    department: '',
    cvPreference: '',
    workModelPreference: '',
    platformSatisfaction: '',
    postInterviewFeedbackSatisfaction: '',
    salaryTransparencyOpinion: '',
    preferredPlatform: '',
    applicationFrequency: '',
    dailyApplicationCount: '',
    unemploymentChallenges: [] as string[],
    bootcampBenefit: '',
    bootcampContent: '',
    bootcampJobGuarantee: '',
  })

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 4000)

    return () => {
      clearTimeout(contentTimer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep !== totalSteps) {
      handleNext()
      return
    }

    // Form validasyonu
    const requiredFields = [
      'gender',
      'graduationDate',
      'gpa',
      'desiredPosition',
      'expectedSalary',
      'unemploymentDuration',
      'totalApplications',
      'interviewCount',
      'location',
      'feedbackSatisfaction',
      'hrCommunicationSatisfaction',
      'department',
      'cvPreference',
      'workModelPreference',
      'platformSatisfaction',
      'postInterviewFeedbackSatisfaction',
      'salaryTransparencyOpinion',
      'preferredPlatform',
      'dailyApplicationCount',
      'bootcampBenefit',
      'bootcampContent',
      'bootcampJobGuarantee',
    ]

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    if (missingFields.length > 0) {
      toast.error('Lütfen tüm alanları doldurun!', {
        description: `Eksik alanlar:\n${missingFields.map(field => `• ${getFieldLabel(field)}`).join('\n')}`,
        duration: 5000,
      })
      return
    }

    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/success')
      } else {
        if (data.missingFields) {
          toast.error('Eksik alanlar var', {
            description: data.missingFields.map((field: string) => `• ${getFieldLabel(field)}`).join('\n'),
            duration: 5000,
          })
        } else {
          toast.error('Bir hata oluştu', {
            description: data.error || 'Lütfen tekrar deneyin.',
          })
        }
      }
    } catch (error) {
      console.error('Hata:', error)
      toast.error('Bir hata oluştu', {
        description: 'Lütfen tekrar deneyin.',
      })
    }
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.gender &&
          formData.graduationDate &&
          formData.department &&
          formData.gpa &&
          formData.location &&
          formData.preferredPlatform
        )
      case 2:
        return (
          formData.desiredPosition &&
          formData.expectedSalary &&
          formData.unemploymentDuration &&
          formData.totalApplications &&
          formData.interviewCount &&
          formData.dailyApplicationCount &&
          formData.cvPreference &&
          formData.workModelPreference
        )
      case 3:
        return (
          formData.hiringProcessSatisfaction &&
          formData.requirementsSatisfaction &&
          formData.feedbackSatisfaction
        )
      case 4:
        return (
          formData.platformSatisfaction &&
          formData.postInterviewFeedbackSatisfaction &&
          formData.salaryTransparencyOpinion
        )
      case 5:
        return (
          formData.bootcampBenefit &&
          formData.bootcampContent &&
          formData.bootcampJobGuarantee
        )
      case 6:
        return (
          formData.hrCommunicationSatisfaction
        )
      default:
        return true
    }
  }

  if (!showContent) {
    return <IntroAnimation />
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                Bu ankete katılarak, verdiğiniz bilgilerin araştırma amacıyla kullanılmasını kabul etmiş olursunuz. Toplanan veriler, işsizlik deneyimlerini analiz etmek ve iyileştirme önerileri geliştirmek için kullanılacaktır. Kişisel tanımlayıcı bilgiler talep edilmemekte ve veriler anonim olarak işlenmektedir. Anketi doldurmanız, bu koşulları kabul ettiğiniz anlamına gelmektedir.
              </p>
            </div>
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className='flex flex-col gap-2'>
                <p className="text-gray-600 text-lg leading-relaxed border-none rounded-lg border-gray-500 pl-4 bg-red-500/10">
                  <span className="font-bold uppercase text-red-500">Not:</span> Bu ankete yalnızca <span className='font-bold underline'>hiç işe girmemiş</span> iş bulamayan bireylerin katılımı beklenmektedir.
                </p>

              </div>

              <div className="space-y-8">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Cinsiyet</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department">Mezun Olduğunuz Bölüm</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bölümünüzü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gpa">Mezuniyet Notu</Label>
                  <Select
                    value={formData.gpa}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gpa: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Notunuzu seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {gpaOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Yaşadığınız Şehir</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="İl seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {turkishCities.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="block text-sm font-medium text-gray-700">Mezuniyet Tarihi</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Select
                        value={formData.graduationDate ? new Date(formData.graduationDate).getFullYear().toString() : ''}
                        onValueChange={(year) => {
                          let newDate;
                          if (formData.graduationDate) {
                            newDate = new Date(formData.graduationDate);
                            newDate.setFullYear(parseInt(year));
                          } else {
                            newDate = new Date(parseInt(year), 0, 1);
                          }
                          setFormData(prev => ({
                            ...prev,
                            graduationDate: newDate.toISOString()
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Yıl" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.graduationDate ? (new Date(formData.graduationDate).getMonth() + 1).toString() : ''}
                        onValueChange={(month) => {
                          let newDate;
                          if (formData.graduationDate) {
                            newDate = new Date(formData.graduationDate);
                            newDate.setMonth(parseInt(month) - 1);
                          } else {
                            const currentYear = new Date().getFullYear();
                            newDate = new Date(currentYear, parseInt(month) - 1, 1);
                          }
                          setFormData(prev => ({
                            ...prev,
                            graduationDate: newDate.toISOString()
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Ay" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const date = new Date(2024, i, 1);
                            return {
                              value: (i + 1).toString(),
                              label: format(date, 'MMMM', { locale: tr })
                            };
                          }).map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={formData.graduationDate ? new Date(formData.graduationDate).getDate().toString() : ''}
                        onValueChange={(day) => {
                          let newDate;
                          if (formData.graduationDate) {
                            newDate = new Date(formData.graduationDate);
                            newDate.setDate(parseInt(day));
                          } else {
                            const currentYear = new Date().getFullYear();
                            newDate = new Date(currentYear, 0, parseInt(day));
                          }
                          setFormData(prev => ({
                            ...prev,
                            graduationDate: newDate.toISOString()
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Gün" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            {
                              length: new Date(
                                formData.graduationDate ? new Date(formData.graduationDate).getFullYear() : new Date().getFullYear(),
                                formData.graduationDate ? new Date(formData.graduationDate).getMonth() : 0,
                                0
                              ).getDate()
                            },
                            (_, i) => i + 1
                          ).map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Tercih ettiğiniz iş arama platformu</Label>
                  <Select
                    value={formData.preferredPlatform}
                    onValueChange={(value) =>
                      setFormData({ ...formData, preferredPlatform: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Platform seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformPreferences.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700">Aradığınız Pozisyon</Label>
                <Select
                  value={formData.desiredPosition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, desiredPosition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pozisyon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">Maaş Beklentiniz</Label>
                <Select
                  value={formData.expectedSalary}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, expectedSalary: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">İşsizlik Kalma Süreniz</Label>
                <Select
                  value={formData.unemploymentDuration}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, unemploymentDuration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {unemploymentDurations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">Toplam İş Başvurusu Sayınız</Label>
                <Select
                  value={formData.totalApplications}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, totalApplications: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationCountRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">Görüşmeye Çağrılma Sayınız</Label>
                <Select
                  value={formData.interviewCount}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, interviewCount: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewCountRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700">Günde ortalama kaç başvuru yapıyorsunuz?</Label>
                <Select
                  value={formData.dailyApplicationCount}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, dailyApplicationCount: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Başvuru sayısı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {dailyApplicationCount.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">İş başvurusunda hangi CV formatını kullanmayı tercih ediyorsunuz?</Label>
                <RadioGroup
                  value={formData.cvPreference}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, cvPreference: value }))}
                  className="flex flex-col space-y-1 mt-2 pl-1"
                >
                  {cvPreferences.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`cvPreference-${option.value}`} />
                      <Label htmlFor={`cvPreference-${option.value}`} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Hangi çalışma modelini tercih ediyorsunuz?</Label>
                <RadioGroup
                  value={formData.workModelPreference}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, workModelPreference: value }))}
                  className="flex flex-col space-y-1 mt-2 pl-1"
                >
                  {workModelPreferences.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={`workModelPreference-${option.value}`} />
                      <Label htmlFor={`workModelPreference-${option.value}`} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-20">
              <div className="space-y-4">
                <Label className="text-base">Şirketlerin işe alım süreçlerinin şeffaflığı ve profesyonelliğinden ne kadar memnunsunuz?</Label>
                <RadioGroup
                  value={formData.hiringProcessSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, hiringProcessSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`hiringProcess-${value}`} />
                      <Label htmlFor={`hiringProcess-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label className="text-base">İş ilanlarındaki gereksinimlerin gerçekçi olup olmamasından ne kadar memnunsunuz?</Label>
                <RadioGroup
                  value={formData.requirementsSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, requirementsSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`requirements-${value}`} />
                      <Label htmlFor={`requirements-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label className="text-base">İşverenlerin başvurularınıza geri bildirim verme oranından ne kadar memnunsunuz?</Label>
                <RadioGroup
                  value={formData.feedbackSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, feedbackSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`feedback-${value}`} />
                      <Label htmlFor={`feedback-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-20">
              <div className="space-y-4">
                <Label className="text-base">İş başvurusunda kullanılan platformlardan (LinkedIn, Kariyer.net vb.) memnuniyet seviyeniz nedir?</Label>
                <RadioGroup
                  value={formData.platformSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, platformSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`platformSatisfaction-${value}`} />
                      <Label htmlFor={`platformSatisfaction-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label className="text-base">Şirketlerin size iş görüşmesinden sonra geri bildirim verip vermemesinden ne kadar memnunsunuz?</Label>
                <RadioGroup
                  value={formData.postInterviewFeedbackSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, postInterviewFeedbackSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`postInterviewFeedback-${value}`} />
                      <Label htmlFor={`postInterviewFeedback-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label className="text-base">İşverenlerin pozisyonla ilgili olarak maaş şeffaflığı uygulamaları gerektiğini düşünüyor musunuz?</Label>
                <RadioGroup
                  value={formData.salaryTransparencyOpinion}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, salaryTransparencyOpinion: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`salaryTransparency-${value}`} />
                      <Label htmlFor={`salaryTransparency-${value}`} className="font-normal">
                        {value} - {getAgreementLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-20">
              {bootcampExperienceQuestions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <Label className="text-base">{question.question}</Label>
                  <RadioGroup
                    value={formData[question.id as keyof typeof formData] as string}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, [question.id]: value }))}
                    className="flex flex-col space-y-1 pl-1"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center space-x-3">
                        <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                        <Label htmlFor={`${question.id}-${value}`} className="font-normal">
                          {value} - {getAgreementLabel(value)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </motion.div>
        )
      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-20">
              <div className="space-y-4">
                <Label className="text-base">İK ekibiyle iletişim kurmanın kolaylığından ne kadar memnunsunuz?</Label>
                <RadioGroup
                  value={formData.hrCommunicationSatisfaction}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, hrCommunicationSatisfaction: value }))}
                  className="flex flex-col space-y-1 pl-1"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center space-x-3">
                      <RadioGroupItem value={value.toString()} id={`hrCommunication-${value}`} />
                      <Label htmlFor={`hrCommunication-${value}`} className="font-normal">
                        {value} - {getSatisfactionLabel(value)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">İşsizlik süresi boyunca yaşadığınız zorluklar nelerdir?</Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {unemploymentChallenges.map((challenge) => (
                    <div key={challenge.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`challenge-${challenge.value}`}
                        checked={formData.unemploymentChallenges.includes(challenge.value)}
                        onCheckedChange={(checked) => {
                          setFormData(prev => ({
                            ...prev,
                            unemploymentChallenges: checked
                              ? [...prev.unemploymentChallenges, challenge.value]
                              : prev.unemploymentChallenges.filter(v => v !== challenge.value)
                          }))
                        }}
                      />
                      <Label
                        htmlFor={`challenge-${challenge.value}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {challenge.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-8">
            <div className="relative h-2 bg-gray-200 rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gray-900 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                initial={false}
              />
            </div>
            <div className="flex justify-end mt-2 text-sm text-gray-600">
              <span>{currentStep}/{totalSteps}</span>
            </div>
          </div>

          <div className="h-[calc(100vh-18rem)] overflow-y-auto mb-4 no-scrollbar">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              variant="outline"
            >
              Geri
            </Button>
            <Button
              type={currentStep === totalSteps ? 'submit' : 'button'}
              onClick={currentStep === totalSteps ? undefined : handleNext}
              disabled={!isCurrentStepValid()}
            >
              {currentStep === totalSteps ? 'Gönder' : 'İleri'}
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  )
}
