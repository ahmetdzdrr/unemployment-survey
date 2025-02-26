import { NextResponse } from 'next/server'
import { Client as Appwrite, Databases, ID } from 'node-appwrite'
import { differenceInDays } from 'date-fns'

// Server-side Appwrite client
const client = new Appwrite()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Zorunlu alanların kontrolü
    const requiredFields = [
      'gender',
      'graduationDate',
      'department',
      'desiredPosition',
      'expectedSalary',
      'unemploymentDuration',
      'totalApplications',
      'interviewCount',
      'jobListingsSatisfaction',
      'jobMatchSatisfaction',
      'responseTimeSatisfaction',
      'hiringProcessSatisfaction',
      'requirementsSatisfaction',
      'feedbackSatisfaction',
      'hrCommunicationSatisfaction',
      'platformSatisfaction',
      'postInterviewFeedbackSatisfaction',
      'salaryTransparencyOpinion',
      'dailyApplicationCount',
      'unemploymentChallenges',
      'bootcampBenefit',
      'bootcampContent',
      'bootcampJobGuarantee'
    ]

    const missingFields = requiredFields.filter(field => !data[field])
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Eksik alanlar var', 
          missingFields 
        },
        { status: 400 }
      )
    }

    // Mezuniyet tarihi ile şu anki tarih arasındaki gün farkını hesapla
    const graduationDate = new Date(data.graduationDate)
    const today = new Date()
    const unemploymentDaysCount = differenceInDays(today, graduationDate)

    // Appwrite'a kaydet
    const survey = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        // Kişisel Bilgiler
        gender: data.gender,
        graduationDate: data.graduationDate,
        department: data.department,
        gpa: data.gpa,
        location: data.location,

        // İş Arama Süreci
        desiredPosition: data.desiredPosition,
        expectedSalary: data.expectedSalary,
        unemploymentDuration: data.unemploymentDuration,
        totalApplications: data.totalApplications,
        interviewCount: data.interviewCount,
        unemploymentDaysCount: unemploymentDaysCount,
        dailyApplicationCount: data.dailyApplicationCount,
        unemploymentChallenges: data.unemploymentChallenges,

        // Tercihler
        cvPreference: data.cvPreference,
        workModelPreference: data.workModelPreference,
        preferredPlatform: data.preferredPlatform,

        // Memnuniyet Değerlendirmeleri
        hiringProcessSatisfaction: parseInt(data.hiringProcessSatisfaction),
        requirementsSatisfaction: parseInt(data.requirementsSatisfaction),
        feedbackSatisfaction: parseInt(data.feedbackSatisfaction),

        // İşveren İletişim Değerlendirmeleri
        platformSatisfaction: parseInt(data.platformSatisfaction),
        postInterviewFeedbackSatisfaction: parseInt(data.postInterviewFeedbackSatisfaction),
        salaryTransparencyOpinion: parseInt(data.salaryTransparencyOpinion),

        // Bootcamp Deneyimi Değerlendirmeleri
        bootcampBenefit: parseInt(data.bootcampBenefit),
        bootcampContent: parseInt(data.bootcampContent),
        bootcampJobGuarantee: parseInt(data.bootcampJobGuarantee),

        hrCommunicationSatisfaction: parseInt(data.hrCommunicationSatisfaction),
      }
    )

    return NextResponse.json({ success: true, data: survey })
  } catch (error) {
    console.error('Hata:', error)
    return NextResponse.json(
      { success: false, error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
} 