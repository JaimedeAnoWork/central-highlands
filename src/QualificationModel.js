import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, ComposedChart, Area, PieChart, Pie, Cell, Label
} from 'recharts';

const QualificationModel = () => {
  const [activeTab, setActiveTab] = useState('summary');

  // Population data
  const years = [2021, 2026, 2031, 2036, 2041, 2046, 2051];
  const populationData = years.map((year, index) => ({
    year,
    totalPopulation: [207601, 225573, 244556, 263507, 283677, 304262, 325259][index],
    workingAgePopulation: [118374, 127930, 137729, 148251, 160617, 172377, 183855][index],
  }));

  // Model projection data for qualification needs
  const modelYears = [2024, 2026, 2031, 2035, 2041, 2046, 2050, 2051];
  const qualificationData = modelYears.map((year, index) => ({
    year,
    qualifiedWorkersNeeded: [53216, 56520, 65423, 73253, 86292, 98459, 109126, 110654][index],
    cumulativeQualifications: [0, 3304, 12207, 20037, 33076, 45243, 55910, 57438][index],
    qualificationRate: [0.56, 0.58, 0.62, 0.66, 0.72, 0.76, 0.80, 0.80][index],
    estimatedEmployment: [95028, 97707, 104741, 110731, 120364, 129029, 136408, 138317][index]
  }));

  // Workforce dynamics
  const workforceData = [2026, 2031, 2036, 2041, 2046, 2051].map((year, index) => ({
    year,
    entrants: [13108, 13636, 14654, 16814, 16579, 16649][index],
    exits: [3551, 3838, 4132, 4448, 4819, 5171][index],
    netChange: [9556, 9798, 10522, 12366, 11760, 11478][index]
  }));

  // VSP Top 10 Industries data
  const topIndustriesData = [
    { name: 'Health Care & Social Assistance', value: 10773, fill: '#8884d8', growth: 5971, retirements: 4794 },
    { name: 'Construction', value: 4133, fill: '#83a6ed', growth: 1834, retirements: 2290 },
    { name: 'Education & Training', value: 3861, fill: '#8dd1e1', growth: 1513, retirements: 2340 },
    { name: 'Retail Trade', value: 2546, fill: '#82ca9d', growth: 955, retirements: 1593 },
    { name: 'Accommodation & Food Services', value: 2305, fill: '#a4de6c', growth: 937, retirements: 1363 },
    { name: 'Agriculture, Forestry & Fishing', value: 1818, fill: '#d0ed57', growth: 109, retirements: 1704 },
    { name: 'Professional Services', value: 1763, fill: '#ffc658', growth: 876, retirements: 879 },
    { name: 'Public Administration', value: 1693, fill: '#f28cb1', growth: 496, retirements: 1188 },
    { name: 'Transport & Warehousing', value: 1344, fill: '#b5a8f9', growth: 405, retirements: 936 },
    { name: 'Manufacturing', value: 1146, fill: '#ffb347', growth: -279, retirements: 1441 }
  ];

  // VSP Top 10 Occupations data
  const topOccupationsData = [
    { name: 'Aged & Disabled Carers', value: 1882, fill: '#8884d8', growth: 674, retirements: 1208 },
    { name: 'Sales Assistants', value: 1581, fill: '#83a6ed', growth: 723, retirements: 858 },
    { name: 'Registered Nurses', value: 1503, fill: '#8dd1e1', growth: 741, retirements: 761 },
    { name: 'General Clerks', value: 891, fill: '#82ca9d', growth: 211, retirements: 681 },
    { name: 'Primary School Teachers', value: 807, fill: '#a4de6c', growth: 411, retirements: 395 },
    { name: 'Commercial Cleaners', value: 732, fill: '#d0ed57', growth: 144, retirements: 584 },
    { name: 'Receptionists', value: 708, fill: '#ffc658', growth: 331, retirements: 376 },
    { name: 'Secondary School Teachers', value: 706, fill: '#f28cb1', growth: 318, retirements: 388 },
    { name: 'Truck Drivers', value: 661, fill: '#b5a8f9', growth: 192, retirements: 467 },
    { name: 'Retail Managers', value: 482, fill: '#ffb347', growth: 102, retirements: 380 }
  ];
  
  // Gap analysis for 2035
  const gapData = [
    { name: 'Population Growth Can Provide', value: 16256 },
    { name: 'Migration Required', value: 3781 }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  // Qualification ramp-up needs (with 3-year education lag)
  const rampUpData = [2024, 2027, 2030, 2035, 2040, 2045, 2050].map((year, index) => ({
    year,
    annualQualificationsNeeded: [0, 1781, 1781, 1957, 2173, 2433, 1528][index]
  }));

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for industry breakdown
  const IndustryTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{data.name}</p>
          <p>{`Total new workers needed: ${data.value.toLocaleString()}`}</p>
          <p>{`From growth: ${data.growth.toLocaleString()}`}</p>
          <p>{`From retirements: ${data.retirements.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for workforce flow
  const WorkforceTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{`Total workers 2024-2034: ${(label === "Working Age Population" ? "95,028" : "")}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Function to download the model data as CSV
  const downloadCSV = () => {
    // Determine which data to download based on active tab
    let csvContent = "";
    let filename = "central-highlands-qualification-model.csv";
    
    // Add headers and data based on active tab
    if (activeTab === 'summary' || activeTab === 'population') {
      csvContent = "Year,Total Population,Working Age Population\n";
      populationData.forEach(item => {
        csvContent += `${item.year},${item.totalPopulation},${item.workingAgePopulation}\n`;
      });
      filename = "central-highlands-population-data.csv";
    } else if (activeTab === 'qualifications') {
      csvContent = "Year,Qualified Workers Needed,Cumulative Qualifications,Qualification Rate,Estimated Employment\n";
      qualificationData.forEach(item => {
        csvContent += `${item.year},${item.qualifiedWorkersNeeded},${item.cumulativeQualifications},${item.qualificationRate},${item.estimatedEmployment}\n`;
      });
      filename = "central-highlands-qualification-data.csv";
    } else if (activeTab === 'vsp-industries') {
      csvContent = "Industry,Total New Workers,From Growth,From Retirements\n";
      topIndustriesData.forEach(item => {
        csvContent += `"${item.name}",${item.value},${item.growth},${item.retirements}\n`;
      });
      filename = "central-highlands-top-industries.csv";
    } else if (activeTab === 'vsp-occupations') {
      csvContent = "Occupation,Total New Workers,From Growth,From Retirements\n";
      topOccupationsData.forEach(item => {
        csvContent += `"${item.name}",${item.value},${item.growth},${item.retirements}\n`;
      });
      filename = "central-highlands-top-occupations.csv";
    } else if (activeTab === 'rampup') {
      csvContent = "Year,Annual Qualifications Needed\n";
      rampUpData.forEach(item => {
        csvContent += `${item.year},${item.annualQualificationsNeeded}\n`;
      });
      filename = "central-highlands-qualification-rampup.csv";
    } else if (activeTab === 'attainment-gap') {
      csvContent = "Category,Population Growth Can Provide,Migration Required\n";
      csvContent += `"2035 Qualification Gap",${gapData[0].value},${gapData[1].value}\n`;
      filename = "central-highlands-attainment-gap.csv";
    }
 Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download as PDF
  const downloadPDF = () => {
    // Import html2canvas and jsPDF dynamically
    // Note: In a real implementation, you would need to install these packages
    // and import them properly at the top of the file
    
    // Alert the user that PDF download is being prepared
    alert('Preparing PDF download - this may take a few moments...');
    
    // The actual implementation would use:
    // html2canvas(document.querySelector('#qualification-model-container')).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jspdf();
    //   const imgProps= pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save("central-highlands-qualification-model.pdf");
    // });
    
    // Since we can't actually implement the PDF download in this environment,
    // we'll simulate the behavior for demonstration purposes
    setTimeout(() => {
      console.log("PDF download initiated");
      alert("PDF download would begin now. In a real implementation, this would download a PDF of the current view.");
    }, 1000);
  };

  return (
    <div id="qualification-model-container" className="bg-white text-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Central Highlands Qualification Attainment Model (2024-2034)</h1>
        <div className="flex space-x-2">
          <button 
            onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download CSV
          </button>
          <button 
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('summary')}
          >
            Executive Summary
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'population' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('population')}
          >
            Population
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'qualifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('qualifications')}
          >
            Qualification Needs
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'attainment-gap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('attainment-gap')}
          >
            Closing Attainment Gap
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'vsp-industries' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('vsp-industries')}
          >
            Top Industries (VSP)
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'vsp-occupations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('vsp-occupations')}
          >
            Top Occupations (VSP)
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'rampup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('rampup')}
          >
            Ramp-Up Plan
          </button>
        </div>

        {activeTab === 'summary' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Key Findings</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current qualification rate (2024):</span> 56% post-secondary attainment (23% higher education, 33% VET)</li>
                <li><span className="font-bold">Current qualification gap (2024):</span> 24% below target (difference between current 56% and target 80%)</li>
                <li><span className="font-bold">Target qualification rate (2050):</span> 80% post-secondary attainment</li>
                <li><span className="font-bold">Total qualifications needed by 2050:</span> 57,438 new qualifications</li>
                <li><span className="font-bold">Qualifications to close existing gap:</span> 22,975 qualifications (40% of total need)</li>
                <li><span className="font-bold">Qualifications for new workforce entrants:</span> 34,463 qualifications (60% of total need)</li>
                <li><span className="font-bold">Annual qualification production needed by 2045:</span> 2,433 per year</li>
                <li><span className="font-bold">VSP Data (2024-2034):</span> 35,705 new workers needed across all industries</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">2035 Industry Requirements</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Total qualifications needed by 2035:</span> 20,037 new qualifications</li>
                <li><span className="font-bold">Qualifications to close existing gap:</span> 8,015 qualifications (40% of 2035 need)</li>
                <li><span className="font-bold">Qualifications for new workforce entrants:</span> 12,022 qualifications (60% of 2035 need)</li>
                <li><span className="font-bold">Population growth can support:</span> 16,256 new qualifications</li>
                <li><span className="font-bold">Qualification gap requiring migration:</span> 3,781 qualified workers</li>
                <li><span className="font-bold">Top 3 industries by VSP data (2024-2034):</span> Healthcare (10,773), Construction (4,133), Education (3,861)</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">University Qualification Sub-Goal</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current university qualification rate (25-35 cohort):</span> 23%</li>
                <li><span className="font-bold">Target university qualification rate (2050):</span> 55% of 25-35 age cohort</li>
                <li><span className="font-bold">Currently university-qualified young adults:</span> 4,902 (of 21,312 in this age group)</li>
                <li><span className="font-bold">Target university-qualified young adults (2050):</span> 17,190 (of 31,255 projected)</li>
                <li><span className="font-bold">NEW university qualifications needed by 2050:</span> 12,288 (additional to existing)</li>
                <li><span className="font-bold">To close existing university attainment gap:</span> 6,391 new university qualifications</li>
                <li><span className="font-bold">For future workforce entrants:</span> 5,897 new university qualifications</li>
                <li><span className="font-bold">Annual NEW university qualifications required:</span> 473 per year (average)</li>
                <li><span className="font-bold">First phase (to 2035):</span> 379 NEW university qualifications per year</li>
                <li><span className="font-bold">Second phase (2035-2050):</span> 546 NEW university qualifications per year</li>
              </ul>
            </div>
            
            <p className="mb-4">
              The Central Highlands must dramatically increase qualification output to reach 80% post-secondary education attainment by 2050 while meeting critical industry workforce demands by 2035. Population projections show 74,841 new working age entrants through 2050, with 21,909 exits. Achieving the 80% target requires both maximizing qualification rates among new entrants and implementing immediate qualification ramp-up strategies for existing workers.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">2035 Qualification Gap Analysis</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gapData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Workforce Flow Analysis (2024-2034)</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{
                  category: "Working Age Population",
                  entrants: 74841,
                  exits: 21909,
                  netChange: 52932
                }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip content={<WorkforceTooltip />} />
                  <Legend />
                  <Bar dataKey="entrants" fill="#82ca9d" name="Total Entrants (2024-2050)" />
                  <Bar dataKey="exits" fill="#FF8042" name="Total Exits (2024-2050)" />
                  <Bar dataKey="netChange" fill="#8884d8" name="Net Change" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Key Recommendations</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border border-blue-200">
              <h4 className="text-lg font-bold mb-2 text-blue-800">Alignment with Federation University's High Growth Community Partnership</h4>
              <p className="mb-4">The following recommendations are aligned with Federation University's Central Highlands High Growth Community Partnership election priorities to support a clean economy and advanced technology growth while addressing qualification targets:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-purple-800 mb-2">Education Infrastructure Investment</h5>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Support the proposed Ballarat Co-Operative Education and Skills City Centre ($48m) as a central hub for university qualification delivery</li>
                    <li>Invest in Refreshed Federation TAFE Training Facilities ($5m) to expand construction and automotive trades training</li>
                    <li>Develop the Asia Pacific Regional Leadership Centre ($5m) to support business and government leadership qualifications</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-purple-800 mb-2">Industry-Education Pipeline Programs</h5>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Implement the Community Teacher Training Program ($2.5m) to increase local teaching qualifications</li>
                    <li>Establish the Federation Impact Career Support Service ($5m) to improve graduate outcomes</li>
                    <li>Expand the Asia Pacific Renewable Energy Training Centre ($5m) for clean energy workforce qualifications</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-purple-800 mb-2">University Attainment Accelerators</h5>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Create 100 Science and Business Part Access Scholarships ($3m) targeting STEM qualifications</li>
                    <li>Establish 200 High Growth Community Skills Scholarships ($3m) for priority sectors</li>
                    <li>Support Regional Priority Skills Student Visa program to attract international students in shortage areas</li>
                    <li>Expand undergraduate diplomas and vocational bachelor programs co-designed with industry</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-purple-800 mb-2">Work-Integrated Learning Expansion</h5>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Advocate for a National Paid Placement Fund to support work-integrated learning</li>
                    <li>Implement paid placement requirements across major infrastructure projects</li>
                    <li>Create tax incentives for employers supporting qualification pathways</li>
                    <li>Develop partnerships with local career services and schools for student recruitment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <ul className="list-disc ml-6 space-y-2 mb-6">
              <li>Implement a ramp-up plan starting in 2025 that increases education outputs to 1,781 qualifications annually by 2027.</li>
              <li>Develop targeted migration programs to attract 4,726 skilled workers by 2035, focused on healthcare, construction, and education.</li>
              <li>Improve liveability in the Central Highlands to retain qualified workforce and attract skilled migrants.</li>
              <li>Focus international student programs on high-demand fields with pathways to permanent residency.</li>
              <li>Create incentives for post-secondary qualifications aligned with regional workforce needs.</li>
              <li>Continue scaling qualification production to 2,433 annually by 2045 to achieve 80% attainment by 2050.</li>
            </ul>
          </div>
        )}

        {activeTab === 'population' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Population Projections</h2>
            
            <h3 className="text-xl font-bold mb-3">Central Highlands Population (2021-2051)</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="totalPopulation" stroke="#8884d8" name="Total Population" strokeWidth={2} />
                  <Line type="monotone" dataKey="workingAgePopulation" stroke="#82ca9d" name="Working Age Population (15-60)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Working Age Population Dynamics</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workforceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="entrants" fill="#8884d8" name="New Entrants" />
                  <Bar dataKey="exits" fill="#FF8042" name="Exits (Retirements etc.)" />
                  <Bar dataKey="netChange" fill="#82ca9d" name="Net Change" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Population Analysis</h3>
              <p>The Central Highlands region is projected to grow from 207,601 residents in 2021 to 325,259 by 2051, representing a 57% increase over 30 years. The working age population (ages 15-60) will increase from 118,374 to 183,855 during this period, maintaining a relatively stable proportion of the total population at approximately 56-57%.</p>
              <p className="mt-2">According to the Victorian Skills Plan data, from 2024 to 2034, the Central Highlands will need 35,705 new workers, with 13,670 coming from employment growth and 22,035 from retirements. This workforce growth will require significant investment in post-secondary qualification pathways.</p>
            </div>
          </div>
        )}

        {activeTab === 'qualifications' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Qualification Needs</h2>
            
            <h3 className="text-xl font-bold mb-3">Projected Qualification Requirements</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={qualificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="qualifiedWorkersNeeded" fill="#8884d8" name="Qualified Workers Needed" />
                  <Line yAxisId="left" type="monotone" dataKey="estimatedEmployment" stroke="#FF8042" name="Total Employment" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="qualificationRate" stroke="#82ca9d" name="Qualification Rate" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Cumulative New Qualifications Needed</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="cumulativeQualifications" stroke="#8884d8" fill="#8884d8" name="Cumulative New Qualifications" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Total Qualification Need by Source (2024-2050)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Close Existing Gap', value: 22975, fill: '#8884d8' },
                          { name: 'New Workforce Entrants', value: 34463, fill: '#82ca9d' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">2035 Qualification Gap Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Population Growth Can Provide', value: 16256, fill: '#0088FE' },
                          { name: 'Migration Required', value: 3781, fill: '#FF8042' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {gapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Qualification Gap Analysis</h3>
              <p>Starting from a 56% post-secondary qualification rate in 2024, the model aims to achieve 80% by 2050. This requires producing 57,438 new qualifications over this period, with approximately 40% (22,975) needed to close the existing attainment gap among current workers and 60% (34,463) for new workforce entrants.</p>
              <p className="mt-2">By 2035, 20,037 new qualifications will be needed to meet projected workforce demands. The natural population growth can only support approximately 16,256 new qualifications by 2035, leaving a gap of 3,781 that must be addressed through skilled migration or significantly increased qualification rates among existing residents.</p>
              <p className="mt-2">Closing the existing attainment gap requires upskilling current workers through targeted training programs, while simultaneously ensuring 80% of new workforce entrants obtain post-secondary qualifications.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'attainment-gap' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Closing the Attainment Gap</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Attainment Gap Overview</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current qualification rate (2024):</span> 56% post-secondary attainment</li>
                <li><span className="font-bold">Target qualification rate (2050):</span> 80% post-secondary attainment</li>
                <li><span className="font-bold">Current attainment gap:</span> 24 percentage points</li>
                <li><span className="font-bold">Working age population (2024):</span> 125,372 people</li>
                <li><span className="font-bold">Currently qualified workers:</span> 70,208 (56% of working age population)</li>
                <li><span className="font-bold">Target qualified workers:</span> 100,298 (80% of working age population)</li>
                <li><span className="font-bold">Workers needing qualifications to close gap:</span> 30,090</li>
                <li><span className="font-bold">Sub-goal for age 25-35 cohort:</span> 55% university qualifications by 2050</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Closing the Gap: Existing vs. New Workers</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: '2035 Need', existingWorkers: 8015, newWorkers: 12022 },
                    { category: 'Total 2050 Need', existingWorkers: 22975, newWorkers: 34463 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="existingWorkers" name="Upskill Existing Workers" stackId="a" fill="#8884d8" />
                  <Bar dataKey="newWorkers" name="Qualify New Entrants" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">University Qualification Sub-Goal (25-35 Age Cohort)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Current vs. Target University Attainment</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: 'Current (2024)', value: 23 },
                        { category: 'Target (2050)', value: 55 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="value" name="University Qualification Rate (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Qualification Mix Evolution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { year: '2024', university: 23, vet: 33, noQual: 44 },
                        { year: '2035', university: 36, vet: 31, noQual: 33 },
                        { year: '2050', university: 55, vet: 25, noQual: 20 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="university" name="University Qualification" stackId="a" fill="#8884d8" />
                      <Bar dataKey="vet" name="VET Qualification" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="noQual" name="No Post-Secondary Qual" stackId="a" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-3">University Qualification Analysis (25-35 Cohort)</h3>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Metric</th>
                      <th className="py-2 px-4 border-b">2024</th>
                      <th className="py-2 px-4 border-b">2035</th>
                      <th className="py-2 px-4 border-b">2050</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">Estimated 25-35 age cohort size</td>
                      <td className="py-2 px-4 border-b">21,312</td>
                      <td className="py-2 px-4 border-b">25,202</td>
                      <td className="py-2 px-4 border-b">31,255</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">University qualification rate</td>
                      <td className="py-2 px-4 border-b">23%</td>
                      <td className="py-2 px-4 border-b">36%</td>
                      <td className="py-2 px-4 border-b">55%</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Number with university qualifications</td>
                      <td className="py-2 px-4 border-b">4,902</td>
                      <td className="py-2 px-4 border-b">9,073</td>
                      <td className="py-2 px-4 border-b">17,190</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">NEW university qualifications needed</td>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">4,171</td>
                      <td className="py-2 px-4 border-b">12,288</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">For closing existing gap</td>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">2,169</td>
                      <td className="py-2 px-4 border-b">6,391</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">For new entrants</td>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">2,002</td>
                      <td className="py-2 px-4 border-b">5,897</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Annual NEW university qualifications required</td>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">379 per year</td>
                      <td className="py-2 px-4 border-b">473 per year (avg)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="mb-2">To achieve 55% university qualification in the 25-35 age cohort by 2050, Central Highlands needs to produce 12,288 NEW university qualifications above the current base of 4,902. This includes 6,391 qualifications to close the existing gap among the current workforce and 5,897 for new workforce entrants.</p>
              
              <p className="mb-2">For the first phase to 2035, the region needs to produce 4,171 NEW university graduates (379 per year) to reach a 36% interim target. The second phase from 2035 to 2050 requires accelerating to 546 NEW university graduates per year to reach the 55% target.</p>
              
              <p>This substantial increase in university qualifications will require a combination of strategies including expanded local university offerings, stronger pathways from VET to university, and attraction of university-qualified migrants to the region.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-indigo-800">Strategies for Existing Workers</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Targeted upskilling programs for mid-career workers</li>
                  <li>Recognition of prior learning to accelerate qualification attainment</li>
                  <li>Industry partnerships for on-the-job qualification pathways</li>
                  <li>Flexible delivery models (evening/weekend classes, online options)</li>
                  <li>Subsidized training for priority industries and occupations</li>
                  <li>Focus on workers aged 25-45 for maximum long-term benefit</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-green-800">Strategies for New Entrants</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>School-to-work transition programs with built-in qualifications</li>
                  <li>International student pathways to employment in skill shortage areas</li>
                  <li>Skills attraction campaign targeting qualified workers from other regions</li>
                  <li>Apprenticeship and traineeship expansion in key growth industries</li>
                  <li>Career guidance emphasizing qualification pathways in schools</li>
                  <li>Skilled migration programs targeting qualified workers in high-demand fields</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">University Qualification Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-800">Pathway Development</h4>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Expand university presence in Central Highlands region</li>
                  <li>Develop articulation pathways from VET to university qualifications</li>
                  <li>Increase university satellite campus offerings in high-demand fields</li>
                  <li>Partner with metropolitan universities for local delivery options</li>
                  <li>Create industry-sponsored degree programs with guaranteed employment</li>
                  <li>Develop micro-credentials that stack toward university qualifications</li>
                  <li>Establish pipeline from high school to university via early entry programs</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-blue-800">Support Mechanisms</h4>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Scholarships for students committed to working in the region post-graduation</li>
                  <li>Housing support for university students to address affordability barriers</li>
                  <li>Regional employment guarantees for specific university programs</li>
                  <li>Transport subsidies for students traveling to university campuses</li>
                  <li>Online learning hubs with mentoring support in regional centers</li>
                  <li>Childcare support for mature age students pursuing university qualifications</li>
                  <li>Employer subsidies for releasing workers to undertake university study</li>
                </ul>
              </div>
            </div>
          
            <h3 className="text-xl font-bold mb-3">Gap Closure Breakdown: University Qualifications</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: '2035 Need', existingGap: 2169, newEntrants: 2002 },
                    { category: 'Total 2050 Need', existingGap: 6391, newEntrants: 5897 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="existingGap" name="Close University Gap (Existing Workers)" stackId="a" fill="#8884d8" />
                  <Bar dataKey="newEntrants" name="New Entrants University Qualifications" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Timeframe</th>
                    <th className="py-2 px-4 border-b">Existing Workers to Upskill</th>
                    <th className="py-2 px-4 border-b">New Entrants to Qualify</th>
                    <th className="py-2 px-4 border-b">Total Qualifications</th>
                    <th className="py-2 px-4 border-b">Annual Production</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">2024-2035</td>
                    <td className="py-2 px-4 border-b">8,015</td>
                    <td className="py-2 px-4 border-b">12,022</td>
                    <td className="py-2 px-4 border-b">20,037</td>
                    <td className="py-2 px-4 border-b">1,821 per year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">2035-2050</td>
                    <td className="py-2 px-4 border-b">14,960</td>
                    <td className="py-2 px-4 border-b">22,441</td>
                    <td className="py-2 px-4 border-b">37,401</td>
                    <td className="py-2 px-4 border-b">2,493 per year</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="py-2 px-4 border-b">2024-2050 Total</td>
                    <td className="py-2 px-4 border-b">22,975</td>
                    <td className="py-2 px-4 border-b">34,463</td>
                    <td className="py-2 px-4 border-b">57,438</td>
                    <td className="py-2 px-4 border-b">2,209 per year (avg.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border border-purple-300 bg-purple-50 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-2 text-purple-800">University Qualification Implementation Challenges</h4>
              <p className="mb-2">Achieving the 55% university qualification target for the 25-35 age cohort presents unique challenges:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Limited university presence in the Central Highlands region</li>
                <li>Competition with metropolitan areas for university graduates</li>
                <li>Financial barriers to university education for regional students</li>
                <li>Need for strong articulation pathways between VET and university</li>
                <li>Ensuring university programs align with regional workforce needs</li>
                <li>Retention of university graduates in the region post-qualification</li>
                <li>Access to quality work placements for university students</li>
                <li>Development of specialized teaching staff in high-priority fields</li>
              </ul>
            </div>
            
            <div className="p-4 border border-orange-300 bg-orange-50 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-2 text-orange-700">Key Implementation Challenges</h4>
              <p className="mb-2">Achieving the qualification targets while aligning with Federation University's High Growth Community Partnership priorities requires addressing:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Training capacity constraints, especially for specialized programs in renewable energy and advanced manufacturing</li>
                <li>Barriers to participation for adult learners (time, cost, confidence)</li>
                <li>Employer support for workforce upskilling during working hours</li>
                <li>Attracting and retaining skilled trainers in priority qualification areas</li>
                <li>Housing availability for new qualified workers moving to the region</li>
                <li>Competition with other regions for skilled workers and training resources</li>
                <li>Need for coordinated approach across education, industry and government</li>
                <li>Limited university infrastructure for expanded course offerings</li>
                <li>Funding alignment with infrastructure and program development timelines</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-2 text-purple-800">University Qualification and Federation University Partnership Benefits</h4>
              <p className="mb-2">The Federation University proposals would significantly support the university qualification target through:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Increased local university infrastructure in Ballarat central area, making higher education more accessible</li>
                <li>Expanded teaching capacity in key shortage areas aligned with industry needs</li>
                <li>Clear pathways between TAFE and university qualifications</li>
                <li>Scholarship support for equity groups to increase participation</li>
                <li>Industry partnerships ensuring qualifications match emerging workforce needs</li>
                <li>Focused international student attraction in critical skills shortage areas</li>
                <li>Integrated career support to maximize qualification completion and workforce entry</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'vsp-industries' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Top Industries by New Workers Needed (2024-2034)</h2>
            <p className="text-gray-600 mb-4">Based on Victorian Skills Plan data for Central Highlands region</p>
            
            <h3 className="text-xl font-bold mb-3">Top 10 Industries by New Workers Needed</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topIndustriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<IndustryTooltip />} />
                  <Legend />
                  <Bar dataKey="value" name="Total New Workers Needed" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Breakdown of New Workers by Growth vs. Replacement</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topIndustriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="growth" name="From Industry Growth" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="retirements" name="From Retirements" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Industry Analysis</h3>
              <p>According to the Victorian Skills Plan data, the Healthcare and Social Assistance sector will require the highest number of new workers by 2034 (10,773), followed by Construction (4,133) and Education and Training (3,861). These three sectors account for 52.6% of all new worker requirements in the Central Highlands region.</p>
              <p className="mt-2">Most industries show worker growth coming from both industry expansion and retirement replacements, with the exception of Manufacturing which shows negative growth (-279) but still requires 1,146 new workers primarily to replace retirements (1,441).</p>
            </div>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Industry</th>
                    <th className="py-2 px-4 border-b text-right">New Workers Needed</th>
                    <th className="py-2 px-4 border-b text-right">From Growth</th>
                    <th className="py-2 px-4 border-b text-right">From Retirements</th>
                    <th className="py-2 px-4 border-b text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {topIndustriesData.map((industry, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="py-2 px-4 border-b">{industry.name}</td>
                      <td className="py-2 px-4 border-b text-right">{industry.value.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b text-right">{industry.growth.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b text-right">{industry.retirements.toLocaleString()}</td>
                      <td className="py-2 px-4 border-b text-right">{(industry.value / 35705 * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="py-2 px-4 border-b">Total (All Industries)</td>
                    <td className="py-2 px-4 border-b text-right">35,705</td>
                    <td className="py-2 px-4 border-b text-right">13,670</td>
                    <td className="py-2 px-4 border-b text-right">22,035</td>
                    <td className="py-2 px-4 border-b text-right">100.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'vsp-occupations' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Top Occupations by New Workers Needed (2024-2034)</h2>
            <p className="text-gray-600 mb-4">Based on Victorian Skills Plan data for Central Highlands region</p>
            
            <h3 className="text-xl font-bold mb-3">Top 10 Occupations by New Workers Needed</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topOccupationsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<IndustryTooltip />} />
                  <Legend />
                  <Bar dataKey="value" name="Total New Workers Needed" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Breakdown of New Workers by Growth vs. Replacement</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topOccupationsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="growth" name="From Industry Growth" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="retirements" name="From Retirements" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Occupation Analysis</h3>
              <p>The top occupations in demand according to the Victorian Skills Plan data align closely with the top industries. Aged and Disabled Carers (1,882), Sales Assistants (1,581), and Registered Nurses (1,503) will require the highest number of new workers by 2034. These occupations match the growth in healthcare, retail, and social assistance sectors.</p>
              <p className="mt-2">Each of these top occupations requires specific qualifications, with most requiring VET certificates, diplomas, or bachelor's degrees. The qualification model must ensure sufficient education pathways are available for these in-demand roles.</p>
            </div>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Occupation</th>
                    <th className="py-2 px-4 border-b text-right">New Workers Needed</th>
                    <th className="py-2 px-4 border-b text-right">From Growth</th>
                    <th className="py-2 px-4 border-b text-right">From Retirements</th>
                    <th className="py-2 px-4 border-b text-center">Typical Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Aged & Disabled Carers</td>
                    <td className="py-2 px-4 border-b text-right">1,882</td>
                    <td className="py-2 px-4 border-b text-right">674</td>
                    <td className="py-2 px-4 border-b text-right">1,208</td>
                    <td className="py-2 px-4 border-b text-center">Certificate III</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Sales Assistants</td>
                    <td className="py-2 px-4 border-b text-right">1,581</td>
                    <td className="py-2 px-4 border-b text-right">723</td>
                    <td className="py-2 px-4 border-b text-right">858</td>
                    <td className="py-2 px-4 border-b text-center">Certificate II/III</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Registered Nurses</td>
                    <td className="py-2 px-4 border-b text-right">1,503</td>
                    <td className="py-2 px-4 border-b text-right">741</td>
                    <td className="py-2 px-4 border-b text-right">761</td>
                    <td className="py-2 px-4 border-b text-center">Bachelor's Degree</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">General Clerks</td>
                    <td className="py-2 px-4 border-b text-right">891</td>
                    <td className="py-2 px-4 border-b text-right">211</td>
                    <td className="py-2 px-4 border-b text-right">681</td>
                    <td className="py-2 px-4 border-b text-center">Certificate III/IV</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Primary School Teachers</td>
                    <td className="py-2 px-4 border-b text-right">807</td>
                    <td className="py-2 px-4 border-b text-right">411</td>
                    <td className="py-2 px-4 border-b text-right">395</td>
                    <td className="py-2 px-4 border-b text-center">Bachelor's Degree</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Commercial Cleaners</td>
                    <td className="py-2 px-4 border-b text-right">732</td>
                    <td className="py-2 px-4 border-b text-right">144</td>
                    <td className="py-2 px-4 border-b text-right">584</td>
                    <td className="py-2 px-4 border-b text-center">Certificate II</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Receptionists</td>
                    <td className="py-2 px-4 border-b text-right">708</td>
                    <td className="py-2 px-4 border-b text-right">331</td>
                    <td className="py-2 px-4 border-b text-right">376</td>
                    <td className="py-2 px-4 border-b text-center">Certificate III</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Secondary School Teachers</td>
                    <td className="py-2 px-4 border-b text-right">706</td>
                    <td className="py-2 px-4 border-b text-right">318</td>
                    <td className="py-2 px-4 border-b text-right">388</td>
                    <td className="py-2 px-4 border-b text-center">Bachelor's Degree</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Truck Drivers</td>
                    <td className="py-2 px-4 border-b text-right">661</td>
                    <td className="py-2 px-4 border-b text-right">192</td>
                    <td className="py-2 px-4 border-b text-right">467</td>
                    <td className="py-2 px-4 border-b text-center">License + Certificate</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Retail Managers</td>
                    <td className="py-2 px-4 border-b text-right">482</td>
                    <td className="py-2 px-4 border-b text-right">102</td>
                    <td className="py-2 px-4 border-b text-right">380</td>
                    <td className="py-2 px-4 border-b text-center">Certificate IV/Diploma</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border border-blue-300 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-bold mb-2 text-blue-700">Additional Top Occupations (11-15)</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li><span className="font-bold">Livestock Farmers:</span> 474 new workers (33 from growth, 441 from retirements)</li>
                <li><span className="font-bold">Handypersons:</span> 462 new workers (86 from growth, 377 from retirements)</li>
                <li><span className="font-bold">Nursing Support Workers:</span> 459 new workers (221 from growth, 238 from retirements)</li>
                <li><span className="font-bold">Construction Managers:</span> 451 new workers (249 from growth, 203 from retirements)</li>
                <li><span className="font-bold">Child Carers:</span> 444 new workers (303 from growth, 143 from retirements)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'rampup' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Qualification Ramp-Up Plan</h2>
            
            <h3 className="text-xl font-bold mb-3">Annual New Qualifications Needed (With 3-Year Education Lag)</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rampUpData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="annualQualificationsNeeded" fill="#8884d8" name="Annual Qualifications Needed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">Ramp-Up Strategy</h3>
              <p>The qualification ramp-up model considers a 3-year average lag between commencement and completion of qualifications. To meet 2035 targets, education providers need to rapidly scale their capacity beginning in 2027, increasing annual qualification production to approximately 1,780 completions per year by 2027-2030.</p>
              <p className="mt-2">Beyond 2035, continued growth in qualification production will be needed, reaching over 2,400 annual completions by 2045 to achieve the 80% attainment target by 2050.</p>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Migration Requirements</h3>
            <div className="p-4 border border-orange-300 bg-orange-50 rounded-lg">
              <h4 className="text-lg font-bold mb-2 text-orange-700">Migration Strategy Needed</h4>
              <p className="mb-2">Analysis indicates that local population growth and qualification production cannot meet the projected demand. A targeted migration strategy is required, focusing on attracting approximately 4,700 skilled workers to the Central Highlands by 2035.</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Focus international student recruitment on high-demand fields: healthcare, construction, and education</li>
                <li>Develop incentives for post-qualification regional work placements</li>
                <li>Improve regional liveability to attract and retain skilled workers</li>
                <li>Create pathways from temporary to permanent residency for qualified workers in key industries</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t pt-4 text-gray-600 text-sm">
        <p><strong>Data sources:</strong> VIF2023 Regions Population Age Sex Projections, Central Highlands Regional Workforce Data, Victorian Skills Plan Employment Projections Data 2024-2034</p>
        <p><strong>Model assumptions:</strong> Linear progression from 56% to 80% post-secondary qualification rate (2024-2050), 1.4% annual employment growth</p>
        <p><strong>Note:</strong> VSP data represents employment projections for 2024-2034. Qualification model extends to 2050 to achieve 80% attainment target.</p>
      </div>
    </div>
  );
};

export default QualificationModel;
