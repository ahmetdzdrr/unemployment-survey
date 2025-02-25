export function getSatisfactionLabel(value: number): string {
    switch (value) {
        case 1:
            return 'Hiç memnun değilim'
        case 2:
            return 'Memnun değilim'
        case 3:
            return 'Kararsızım'
        case 4:
            return 'Memnunum'
        case 5:
            return 'Çok memnunum'
        default:
            return ''
    }
}

export function getAgreementLabel(value: number): string {
    switch (value) {
        case 1:
            return 'Kesinlikle katılmıyorum'
        case 2:
            return 'Katılmıyorum'
        case 3:
            return 'Kararsızım'
        case 4:
            return 'Katılıyorum'
        case 5:
            return 'Kesinlikle katılıyorum'
        default:
            return ''
    }
}


export const getFieldLabel = (field: string): string => {
    const fieldLabels: { [key: string]: string } = {
        gender: 'Cinsiyet',
        graduationDate: 'Mezuniyet Tarihi',
        department: 'Bölüm',
        desiredPosition: 'Aranan Pozisyon',
        expectedSalary: 'Maaş Beklentisi',
        unemploymentDuration: 'İşsizlik Süresi',
        totalApplications: 'Toplam Başvuru Sayısı',
        interviewCount: 'Görüşme Sayısı',
        jobListingsSatisfaction: 'İş İlanları Memnuniyeti',
        jobMatchSatisfaction: 'İş Uygunluğu Memnuniyeti',
        responseTimeSatisfaction: 'Geri Dönüş Süresi Memnuniyeti',
        hiringProcessSatisfaction: 'İşe Alım Süreci Memnuniyeti',
    }
    return fieldLabels[field] || field
}