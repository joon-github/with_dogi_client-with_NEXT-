import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProcider from "./_providers/ReactQueryProvider";
import Loader from "./_components/block/Loader";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "./_components/block/Footer";
import { Jua } from "next/font/google";
import Alert from "./_components/block/Alert";
import PageMoveMentDetection from "./_components/PageMoveMentDetection";
import RecoilProvider from "./_providers/RecoilProvider";
const jua = Jua({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "with_dogi",
  description: "위드도기와 행복한 반려생활을 해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilProvider>
        <ReactQueryProcider>
          <body className={jua.className}>
            <Alert />
            <Loader />
            <NextUIProvider>
              <PageMoveMentDetection>
                {children}
                <Footer />
              </PageMoveMentDetection>
            </NextUIProvider>
          </body>
        </ReactQueryProcider>
      </RecoilProvider>
    </html>
  );
}
