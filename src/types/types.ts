// types.ts
export interface Course {
	courseowner?: string;
	crcode: string;
	cname: string;
	ctype: string;
	C: string;
	venue?: string;
	slot: string;
	"ERP ID"?: string;
	ename: string;
	id: string;
}

export interface SlotItem {
	slot: string;
	splitSlots: string[];
	selected: boolean;
}

export interface CourseSelection {
	courseType?: string;
	row: Course;
}

export interface FacultyReview {
	coursecode: string;
	facultyname: string;
	rating?: number;
	review?: string;
}

export interface AppState {
	rowID: string;
	monday: SlotItem[];
	tuesday: SlotItem[];
	wednesday: SlotItem[];
	thursday: SlotItem[];
	friday: SlotItem[];
}

export type AppAction =
	| {
			type: "RESET_ALL";
			reset1: SlotItem[];
			reset2: SlotItem[];
			reset3: SlotItem[];
			reset4: SlotItem[];
			reset5: SlotItem[];
	  }
	| { type: "UPDATE_SLOT"; day: string; index: number; value: boolean };
