/** Original, non-official illustration families used for athletic-identity graphics. */
export type MascotKind =
  | 'marauder'
  | 'varsity'
  | 'warrior'
  | 'hawk'
  | 'martlet'
  | 'thunderbird'
  | 'lion'
  | 'bold'
  | 'mustang'
  | 'gael'
  | 'badger'
  | 'monogram';

/** Drives which original campus skyline illustration is drawn for a university. */
export type CampusStyle =
  | 'gothic'
  | 'romanesque'
  | 'modern'
  | 'campus'
  | 'stone'
  | 'coastal'
  | 'urban'
  | 'limestone'
  | 'tower'
  | 'generic';

export interface UniversityColours {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface UniversityConfig {
  id: string;
  name: string;
  shortName: string;
  /** 1–3 letters used for monograms. */
  monogram: string;
  city: string;
  province: string;
  country: string;
  colours: UniversityColours;
  campusStyle: CampusStyle;
  mascot: MascotKind;
  /** Optional path to a licensed hero photo. When absent, an original illustration is drawn. */
  heroImage?: string;
  /** Optional path to a licensed mascot asset. When absent, an original illustration is drawn. */
  mascotIllustration?: string;
  athleticIdentity: string;
  welcomeMessage: string;
  campusLocations: string[];
  sampleCourses: string[];
  advertisementTheme: string;
  campusDescription: string;
  /** Short descriptive words shown on the selection card. */
  vibe: string;
  isCustom?: boolean;
}

export interface CustomUniversityInput {
  name: string;
  city: string;
  province?: string;
  country?: string;
  primary?: string;
  secondary?: string;
}
