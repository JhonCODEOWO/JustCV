export interface CreateCvInterface {
    fullname:         string;
    phoneNumber:      string;
    email:            string;
    residence:        Residence;
    profesionalLinks: ProfesionalLinks;
    workExperience:   WorkExperience[];
    resume:           string;
    education:        Education[];
    educationDraft: Education;
}

export interface Education {
    titleName:       string;
    institutionName: string;
    graduationDate:  string;
    type:           EducationTypes;
}

export interface ProfesionalLinks {
    instagram:    string;
    facebook:     string;
    twitter:      string;
    linkedIn:     string;
    github:       string;
    portfolioWeb: string;
}

export interface Residence {
    city:    string;
    country: string;
}

export interface WorkExperience {
    companyName:  string;
    occupation:   string;
    startDate:    string;
    achievements: Achievement[];
}

export interface Achievement {
    description: string,
}

export type EducationTypes = 'curso' | 'titulo';
