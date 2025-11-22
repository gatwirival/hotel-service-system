// frontend JS: fetch metrics and tasks from API endpoints
async function fetchMetrics(){
  try{
    const res = await fetch('/api/metrics');
    const data = await res.json();
    document.querySelector('#totalRooms .value').textContent = data.total_rooms;
    document.querySelector('#roomsAvailable').textContent = `${data.available_rooms} rooms available`;
    document.querySelector('#occupancy .value').textContent = data.occupancy_rate + '%';
    document.querySelector('#occupancyChange').textContent = `${data.occupancy_change} from last week`;
    document.querySelector('#housekeepingCount .value').textContent = data.housekeeping_count;
    document.querySelector('#hkPending').textContent = `${data.housekeeping_pending} pending completion`;
    document.querySelector('#checkins .value').textContent = data.checkins_today;
    document.querySelector('#vipArrivals').textContent = `${data.vip_arrivals} VIP arrivals`;
  }catch(err){console.error(err)}
}

function renderTasks(tasks){
  const container = document.getElementById('tasksContainer');
  container.innerHTML = '';
  tasks.forEach(t=>{
    const el = document.createElement('div');
    el.className = 'task';
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h4>${t.title}</h4>
        <span class="badge">Room ${t.room_number}</span>
      </div>
      <div class="meta">
        <div><strong>Priority:</strong> ${t.priority}</div>
        <div><strong>Assigned to:</strong> ${t.assigned_name || '—'}</div>
      </div>
      <p>${t.notes || ''}</p>
    `;
    container.appendChild(el);
  });
}

async function fetchTasks(){
  try{
    const res = await fetch('/api/tasks');
    const data = await res.json();
    renderTasks(data);
  }catch(err){console.error(err)}
}

document.getElementById('addTaskBtn').addEventListener('click', ()=> {
  alert('Add task feature not wired in this demo. Implement a modal or form.');
});

fetchMetrics();
fetchTasks();
// auto-refresh every 60s
setInterval(()=>{ fetchMetrics(); fetchTasks(); }, 60000);
