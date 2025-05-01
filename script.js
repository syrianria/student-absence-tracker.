document.getElementById('absence-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const studentName = document.getElementById('student-name').value;
  const teacherName = "جملاء";
  const subject = "تقنيه";
  const reason = "الخروج المؤقت";
  const movementType = document.getElementById('movement-type').value;
  const timestampInput = document.getElementById('timestamp').value;

  if (!timestampInput) {
    alert("الرجاء إدخال الوقت.");
    return;
  }

  const timestamp = new Date(timestampInput);
  let resultMessage = '';

  if (movementType === 'رجوع') {
    const exitTimeStr = localStorage.getItem('exitTime');

    if (exitTimeStr) {
      const exitTime = new Date(exitTimeStr);
      const durationMs = timestamp - exitTime;

      if (durationMs > 0) {
        const durationMinutes = Math.ceil(durationMs / 60000);

        resultMessage = `
          <h2>تصريح الرجوع</h2>
          <p><strong>اسم الطالبة:</strong> ${studentName}</p>
          <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
          <p><strong>المادة:</strong> ${subject}</p>
          <p><strong>الغرض:</strong> ${reason}</p>
          <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
          <p><strong>مدة الغياب:</strong> ${durationMinutes} دقيقة</p>
          <p><strong>تصريح الرجوع: تم بنجاح!</strong></p>
        `;
      } else {
        resultMessage = "<p>وقت الرجوع أقدم من وقت الخروج! تأكدي من صحة الوقت.</p>";
      }
    } else {
      resultMessage = "<p>لا يوجد وقت خروج مسجل، تأكدي من تسجيل الخروج أولًا.</p>";
    }

  } else {
    // تسجل الخروج
    localStorage.setItem('exitTime', timestampInput);

    resultMessage = `
      <h2>تصريح الخروج</h2>
      <p><strong>اسم الطالبة:</strong> ${studentName}</p>
      <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
      <p><strong>المادة:</strong> ${subject}</p>
      <p><strong>الغرض:</strong> ${reason}</p>
      <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
      <p><strong>تصريح الخروج: تم بنجاح!</strong></p>
    `;
  }

  document.getElementById('result').innerHTML = resultMessage;
});
