import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  practice: z.string().min(1, "Practice name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  message: z.string().optional(),
  product: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // TODO: Integrate with Resend or other email service
    // const { data, error } = await resend.emails.send({
    //   from: 'Synaptix <noreply@synaptix.vercel.app>',
    //   to: ['sales@kronoshealth.co'],
    //   subject: `Demo Request: ${validatedData.practice}`,
    //   html: `...`,
    // });

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
