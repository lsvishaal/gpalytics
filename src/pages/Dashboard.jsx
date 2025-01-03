import GradeDistribution from "@/components/ui/SemesterGradeChart"

const Dashboard = () => {
  const grades = [
    { course_name: "FRENCH", grade: "O" },
    { course_name: "ADVANCED CALCULUS AND COMPLEX ANALYSIS", grade: "O" },
    { course_name: "CHEMISTRY", grade: "O" },
    { course_name: "OBJECT ORIENTED DESIGN AND PROGRAMMING", grade: "A+" },
    { course_name: "ELECTRICAL AND ELECTRONICS ENGINEERING", grade: "O" },
    { course_name: "CONSTITUTION OF INDIA", grade: "O" },
    { course_name: "PHYSICAL AND MENTAL HEALTH USING YOGA", grade: "O" },
    { course_name: "ENGINEERING GRAPHICS AND DESIGN", grade: "O" },
    { course_name: "GENERAL APTITUDE", grade: "A+" },
  ];
  return (
    <div>
      <GradeDistribution grades={grades} />
    </div>
  )
}
export default Dashboard