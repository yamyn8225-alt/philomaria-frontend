function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="page-content" dir="rtl">
      <h1 className="page-title">
        مرحباً، {user?.name || 'مستخدم'}
      </h1>

      <p className="page-subtitle">
        نظرة عامة على نشاطك على المنصة
      </p>

      <div className="stats-grid">
        <StatCard
          icon="📖"
          title="آخر الدروس"
          value="0"
        />

        <StatCard
          icon="📁"
          title="الملفات الجديدة"
          value="0"
        />

        <StatCard
          icon="📝"
          title="الاختبارات القادمة"
          value="0"
        />

        <StatCard
          icon="📊"
          title="نسبة الإنجاز"
          value="0%"
        />
      </div>

      <div className="card">
        <h3 className="card-title">
          آخر الدروس المضافة
        </h3>

        <div id="latest-lessons-list">
          لا توجد دروس مضافة حالياً
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-info">
        <h3>{title}</h3>
        <div className="value">
          {value}
        </div>
      </div>
    </div>
  )
}

export default Dashboard