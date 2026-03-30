"use client"

import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">

        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#7c3aed", // your purple
              colorBackground: "#ffffff",
              colorText: "#111827",
              colorInputBackground: "#f9fafb",
              colorInputText: "#111827",
            },

            elements: {
              card: "shadow-none border-none",
              headerTitle: "text-xl font-bold text-purple-600",
              headerSubtitle: "text-gray-500",

              formButtonPrimary:
                "bg-purple-600 hover:bg-purple-700 text-white rounded-lg",

              formFieldInput:
                "border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500",

              footerActionLink:
                "text-purple-600 hover:underline",

              socialButtonsBlockButton:
                "border border-gray-300 hover:bg-gray-100",

              dividerLine: "bg-gray-200",
              dividerText: "text-gray-400",
            },
          }}
        />

      </div>
    </div>
  )
}