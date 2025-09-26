/*
 * Holiday Planner client-side logic
 *
 * This script powers the interactive behaviours of the holiday planner. It maintains
 * the user's selections (interest, destination, accommodation, transport, activities)
 * and computes a simple itinerary and budget summary. The data is hard-coded to
 * demonstrate the planner without relying on external APIs.
 */

$(function() {
  // Predefined data for destinations, accommodations, transport and activities
  const data = {
    beach: [
      {
        id: 'goa',
        name: 'Goa',
        description: 'A coastal paradise in India known for golden beaches, lively nightlife and seafood.',
        image: 'assets/beach.png',
        hotels: [
          { name: 'Seaside Resort', price: 80 },
          { name: 'Beachfront Hotel', price: 120 },
          { name: 'Palm Retreat', price: 100 }
        ],
        transport: [
          { name: 'Flight', price: 200 },
          { name: 'Train', price: 60 },
          { name: 'Bus', price: 40 }
        ],
        activities: [
          { name: 'Sunbathing', price: 10 },
          { name: 'Surfing', price: 50 },
          { name: 'Boat Tour', price: 30 }
        ]
      },
      {
        id: 'maldives',
        name: 'Maldives',
        description: 'Tropical nation in the Indian Ocean composed of more than 1,000 coral islands.',
        image: 'assets/beach.png',
        hotels: [
          { name: 'Island Villa', price: 200 },
          { name: 'Water Bungalow', price: 350 },
          { name: 'Lagoon Resort', price: 250 }
        ],
        transport: [
          { name: 'Flight', price: 400 },
          { name: 'Seaplane', price: 600 }
        ],
        activities: [
          { name: 'Snorkeling', price: 60 },
          { name: 'Diving', price: 80 },
          { name: 'Island Hopping', price: 70 }
        ]
      },
      {
        id: 'bali',
        name: 'Bali',
        description: 'Indonesian island known for its forested volcanic mountains, iconic rice paddies and beaches.',
        image: 'assets/beach.png',
        hotels: [
          { name: 'Jungle Retreat', price: 150 },
          { name: 'Sea Cliff Resort', price: 180 },
          { name: 'Ubud Villa', price: 140 }
        ],
        transport: [
          { name: 'Flight', price: 350 },
          { name: 'Ferry', price: 100 }
        ],
        activities: [
          { name: 'Temple Tour', price: 40 },
          { name: 'Rice Terrace Walk', price: 25 },
          { name: 'Surfing Lesson', price: 45 }
        ]
      }
    ],
    mountains: [
      {
        id: 'manali',
        name: 'Manali',
        description: 'Popular hill station nestled in the mountains of Himachal Pradesh in India.',
        image: 'assets/mountain.png',
        hotels: [
          { name: 'Himalayan Lodge', price: 70 },
          { name: 'River View Resort', price: 90 },
          { name: 'Mountain Cabin', price: 60 }
        ],
        transport: [
          { name: 'Flight', price: 150 },
          { name: 'Train', price: 80 },
          { name: 'Bus', price: 50 }
        ],
        activities: [
          { name: 'Trekking', price: 30 },
          { name: 'Paragliding', price: 70 },
          { name: 'Skiing', price: 60 }
        ]
      },
      {
        id: 'darjeeling',
        name: 'Darjeeling',
        description: 'Scenic hill station in West Bengal famous for tea gardens and panoramic views.',
        image: 'assets/mountain.png',
        hotels: [
          { name: 'Tea Estate Stay', price: 80 },
          { name: 'Hillside Hotel', price: 90 },
          { name: 'Colonial Lodge', price: 75 }
        ],
        transport: [
          { name: 'Flight', price: 180 },
          { name: 'Train', price: 90 }
        ],
        activities: [
          { name: 'Tea Garden Tour', price: 20 },
          { name: 'Toy Train Ride', price: 25 },
          { name: 'Hiking', price: 30 }
        ]
      },
      {
        id: 'alps',
        name: 'Swiss Alps',
        description: 'Europe’s highest and most extensive mountain range spanning France, Italy and Switzerland.',
        image: 'assets/mountain.png',
        hotels: [
          { name: 'Chalet Alpine', price: 220 },
          { name: 'Ski Resort', price: 260 },
          { name: 'Mountain Lodge', price: 200 }
        ],
        transport: [
          { name: 'Flight', price: 500 },
          { name: 'Train', price: 200 }
        ],
        activities: [
          { name: 'Skiing', price: 80 },
          { name: 'Snowboarding', price: 75 },
          { name: 'Cable Car', price: 40 }
        ]
      }
    ],
    city: [
      {
        id: 'newyork',
        name: 'New York',
        description: 'Vibrant metropolis known for its skyscrapers, culture and diverse cuisine.',
        image: 'assets/city.png',
        hotels: [
          { name: 'Downtown Hotel', price: 180 },
          { name: 'Times Square Inn', price: 220 },
          { name: 'Boutique Loft', price: 200 }
        ],
        transport: [
          { name: 'Flight', price: 600 },
          { name: 'Train', price: 250 }
        ],
        activities: [
          { name: 'City Tour', price: 60 },
          { name: 'Museum Visit', price: 30 },
          { name: 'Broadway Show', price: 120 }
        ]
      },
      {
        id: 'london',
        name: 'London',
        description: 'Historic city and capital of the UK filled with museums, landmarks and theatre.',
        image: 'assets/city.png',
        hotels: [
          { name: 'Central Hotel', price: 210 },
          { name: 'Riverside Stay', price: 190 },
          { name: 'Heritage Inn', price: 170 }
        ],
        transport: [
          { name: 'Flight', price: 550 },
          { name: 'Train', price: 300 }
        ],
        activities: [
          { name: 'Sightseeing Tour', price: 45 },
          { name: 'Theatre Show', price: 80 },
          { name: 'Museum Pass', price: 25 }
        ]
      },
      {
        id: 'tokyo',
        name: 'Tokyo',
        description: 'Japan’s bustling capital blending ultra-modern and traditional architecture.',
        image: 'assets/city.png',
        hotels: [
          { name: 'Shibuya Hotel', price: 230 },
          { name: 'City Center Inn', price: 210 },
          { name: 'Traditional Ryokan', price: 190 }
        ],
        transport: [
          { name: 'Flight', price: 700 },
          { name: 'Bullet Train', price: 450 }
        ],
        activities: [
          { name: 'Temple Visit', price: 35 },
          { name: 'Anime Tour', price: 55 },
          { name: 'Food Tasting', price: 65 }
        ]
      }
    ]
  };

  // State variables
  let selectedInterest = null;
  let selectedDestination = null;
  let selectedAccommodation = null;
  let selectedTransport = null;
  let selectedNights = 1;
  let selectedActivities = [];

  // Utility to capitalise first letter
  function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Render the list of destination cards based on the selected interest.
   * Creates HTML markup for each destination and injects it into #destination-list.
   */
  function renderDestinations() {
    const list = data[selectedInterest] || [];
    const container = $('#destination-list');
    container.empty();
    if (list.length === 0) {
      container.append('<p class="text-muted">No destinations available.</p>');
      return;
    }
    list.forEach((dest, idx) => {
      const card = $(
        `<div class="col-md-4 mb-4">
          <div class="destination-card">
            <img src="${dest.image}" alt="${dest.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${dest.name}</h5>
              <p class="card-text">${dest.description}</p>
              <button class="btn btn-accent w-100 select-destination" data-index="${idx}">Select</button>
            </div>
          </div>
        </div>`
      );
      container.append(card);
    });
  }

  /**
   * Populate the accommodation and transport selects based on the chosen destination.
   */
  function populateAccommodationAndTransport() {
    // Update heading
    $('#selected-destination-name').text(`${selectedDestination.name}`);
    // Populate accommodation
    const accSelect = $('#accommodation-select');
    accSelect.empty();
    selectedDestination.hotels.forEach((hotel, idx) => {
      accSelect.append(`<option value="${idx}">${hotel.name} ($${hotel.price}/night)</u></option>`);
    });
    // Populate transport
    const transSelect = $('#transport-select');
    transSelect.empty();
    selectedDestination.transport.forEach((trans, idx) => {
      transSelect.append(`<option value="${idx}">${trans.name} ($${trans.price})</u></option>`);
    });
  }

  /**
   * Render the activities list for the chosen destination.
   */
  function renderActivities() {
    const list = selectedDestination.activities;
    const container = $('#activities-list');
    container.empty();
    list.forEach(activity => {
      const id = `activity-${activity.name.replace(/\s+/g, '-')}`;
      container.append(
        `<div class="form-check mb-2">
          <input class="form-check-input activity-checkbox" type="checkbox" value="" id="${id}" data-name="${activity.name}" data-price="${activity.price}">
          <label class="form-check-label" for="${id}">
            ${activity.name} ($${activity.price})
          </label>
        </div>`
      );
    });
  }

  /**
   * Update the schedule input fields whenever an activity checkbox is toggled.
   */
  function updateActivitySchedule(name, checked, price) {
    const scheduleContainer = $('#activity-schedule');
    const safeId = name.replace(/\s+/g, '-');
    if (checked) {
      // Create a new schedule block
      const block = $(
        `<div class="activity-time" data-activity="${name}">
          <h6 class="mb-2">${name}</h6>
          <div class="row">
            <div class="col-sm-6 mb-3">
              <label for="date-${safeId}" class="form-label">Date</label>
              <input type="date" class="form-control date-input" id="date-${safeId}" required>
            </div>
            <div class="col-sm-6 mb-3">
              <label for="time-${safeId}" class="form-label">Time</label>
              <input type="time" class="form-control time-input" id="time-${safeId}" required>
            </div>
          </div>
        </div>`
      );
      scheduleContainer.append(block);
    } else {
      // Remove the schedule block
      scheduleContainer.find(`[data-activity="${name}"]`).remove();
    }
  }

  /**
   * Build the itinerary summary and display it in the itinerary section.
   */
  function buildItinerarySummary() {
    const summaryContainer = $('#itinerary-summary');
    summaryContainer.empty();
    // Compute costs
    const accCost = selectedAccommodation.price * selectedNights;
    const transCost = selectedTransport.price;
    let activitiesCost = 0;
    selectedActivities.forEach(a => { activitiesCost += a.price; });
    const totalCost = accCost + transCost + activitiesCost;
    // Build summary card
    let html = '';
    html += '<div class="summary-card">';
    html += `<h5 class="mb-3">Destination: ${selectedDestination.name}</h5>`;
    html += '<table class="table table-bordered align-middle">';
    html += '<thead><tr><th>Item</th><th>Details</th><th>Cost</th></tr></thead><tbody>';
    html += `<tr><td>Accommodation</td><td>${selectedAccommodation.name} × ${selectedNights} night(s)</td><td>$${accCost}</td></tr>`;
    html += `<tr><td>Transport</td><td>${selectedTransport.name}</td><td>$${transCost}</td></tr>`;
    if (selectedActivities.length > 0) {
      selectedActivities.forEach(a => {
        html += `<tr><td>Activity</td><td>${a.name} – ${a.date} ${a.time}</td><td>$${a.price}</td></tr>`;
      });
    } else {
      html += '<tr><td>Activities</td><td colspan="2">No activities selected</td></tr>';
    }
    html += '</tbody>';
    html += `<tfoot><tr><td colspan="2">Total</td><td>$${totalCost}</td></tr></tfoot>`;
    html += '</table>';
    html += '</div>';
    summaryContainer.append(html);
    // Show itinerary section
    $('#itinerary-section').show();
    // Scroll smoothly to itinerary
    document.getElementById('itinerary-section').scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Reset all selections and return to the top of the form.
   */
  function resetPlanner() {
    // Clear state variables
    selectedInterest = null;
    selectedDestination = null;
    selectedAccommodation = null;
    selectedTransport = null;
    selectedNights = 1;
    selectedActivities = [];
    // Reset forms
    $('input[name="interest"]').prop('checked', false);
    $('#destination-list').empty();
    $('#accommodation-select').empty();
    $('#transport-select').empty();
    $('#nights-input').val(1);
    $('#activities-list').empty();
    $('#activity-schedule').empty();
    $('#itinerary-summary').empty();
    // Hide sections
    $('#accommodation-section').hide();
    $('#activities-section').hide();
    $('#itinerary-section').hide();
    // Scroll to search section
    document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' });
  }

  /* Event listeners */
  // Search destinations button
  $('#search-button').on('click', function() {
    selectedInterest = $('input[name="interest"]:checked').val();
    if (!selectedInterest) {
      alert('Please select an interest before searching.');
      return;
    }
    renderDestinations();
    // Hide subsequent sections in case of re-search
    $('#accommodation-section').hide();
    $('#activities-section').hide();
    $('#itinerary-section').hide();
  });

  // Selecting a destination card
  $('#destination-list').on('click', '.select-destination', function() {
    const index = $(this).data('index');
    selectedDestination = data[selectedInterest][index];
    // Populate accommodation and transport options
    populateAccommodationAndTransport();
    // Show accommodation section
    $('#accommodation-section').show();
    // Scroll to accommodation section
    document.getElementById('accommodation-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Move to activities selection
  $('#next-to-activities').on('click', function() {
    // Validate number of nights
    selectedNights = parseInt($('#nights-input').val(), 10);
    if (!selectedNights || selectedNights < 1) {
      alert('Please enter a valid number of nights.');
      return;
    }
    // Get accommodation choice
    const accIndex = parseInt($('#accommodation-select').val(), 10);
    const transIndex = parseInt($('#transport-select').val(), 10);
    selectedAccommodation = selectedDestination.hotels[accIndex];
    selectedTransport = selectedDestination.transport[transIndex];
    // Render activities list
    renderActivities();
    // Reset previously selected activities if re-visiting
    $('#activity-schedule').empty();
    $('input.activity-checkbox').prop('checked', false);
    selectedActivities = [];
    // Show activities section
    $('#activities-section').show();
    // Scroll to activities section
    document.getElementById('activities-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Handle toggling of activity checkboxes
  $('#activities-list').on('change', '.activity-checkbox', function() {
    const name = $(this).data('name');
    const price = parseFloat($(this).data('price'));
    const checked = $(this).is(':checked');
    updateActivitySchedule(name, checked, price);
  });

  // Add selected activities to itinerary and display summary
  $('#add-to-itinerary').on('click', function() {
    selectedActivities = [];
    let valid = true;
    // Iterate through each scheduled block
    $('#activity-schedule .activity-time').each(function() {
      const name = $(this).data('activity');
      const date = $(this).find('.date-input').val();
      const time = $(this).find('.time-input').val();
      const price = parseFloat($(`#activities-list .activity-checkbox[data-name="${name}"]`).data('price'));
      if (!date || !time) {
        alert(`Please choose date and time for ${name}.`);
        valid = false;
        return false; // break out of each loop
      }
      selectedActivities.push({ name, date, time, price });
    });
    if (!valid) return;
    // Build and display itinerary summary
    buildItinerarySummary();
  });

  // Reset button
  $('#reset-button').on('click', function() {
    resetPlanner();
  });
});