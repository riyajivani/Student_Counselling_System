import './report.css';
import Navbar from '../../components/Navigation/navbar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
const dburl = import.meta.env.PUBLIC_URL

const Report = () => {
     const [startDate, setStartDate] = useState(new Date());
     const [endDate, setEndDate] = useState(new Date());
     const [allQuestions, setAllQuestions] = useState([]);
     const [filteredQuestions, setFilteredQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const pdfRef = useRef()

     const selectionRange = {
          startDate: startDate,
          endDate: endDate,
          key: 'selection',
     };

     const handleSelect = (date) => {
          const filtered = allQuestions.filter((que) => {
               const queDate = new Date(que.createdAt);
               return queDate >= date.selection.startDate && queDate <= date.selection.endDate;
          });
          setStartDate(date.selection.startDate);
          setEndDate(date.selection.endDate);
          setFilteredQuestions(filtered);
          setLoading(false);
     };

     useEffect(() => {
          fetchQuestions();
     }, []);

     const fetchQuestions = async () => {
          try {
               const res = await axios.get(`${dburl}/admin/getallQuestion`);
               setAllQuestions(res.data.question);
          } catch (error) {
               console.error("Error fetching questions:", error);
          }
     };

     const handlePDF = async () => {
          const input = pdfRef.current;
          html2canvas(input).then((canvas) => {
               const imgData = canvas.toDataURL('img/png');
               const pdf = new jsPDF('p', 'mm', 'a4', true);
               const pdfWidth = pdf.internal.pageSize.getWidth();
               const pdfHeight = pdf.internal.pageSize.getHeight();
               const imgWidth = canvas.width;
               const imgHeight = canvas.height;
               const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
               const imgX = (pdfWidth - imgWidth * ratio) / 2;
               // const imgY = 30;
               const imgY = (pdfHeight - imgHeight * ratio) / 2;
               pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
               pdf.save('template1.pdf');

          });
     }

     return (
          <div className='report-container'>
               <Navbar />
               <div className="report-body">
                    <h1>Generate Report</h1>
                    <DateRangePicker
                         ranges={[selectionRange]}
                         onChange={handleSelect}
                    />
                    {loading ? (
                         <p>select a Date</p>
                    ) : (
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <button onClick={handlePDF} className='pdf-btn'>download report</button>
                              <div className='filtered-que-report' ref={pdfRef}>
                                   <h2 style={{ textAlign: 'center' }}>Report from {format(startDate, 'MM/dd/yyyy')} to {format(endDate, 'MM/dd/yyyy')}</h2>
                                   {filteredQuestions
                                        ? filteredQuestions.map((que, index) => (
                                             <div key={index} className='filtered-que'>
                                                  <h4 dangerouslySetInnerHTML={{ __html: que.query }}></h4>
                                                  <p>By Student: {que.student.id}</p>
                                                  <p>Status: {que.status}</p>
                                                  <p>To Faculty: {que.faculty.id}</p>
                                             </div>
                                        ))
                                        : <></>
                                   }
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Report;