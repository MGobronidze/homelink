        document.addEventListener('DOMContentLoaded', () => {
            const homeView = document.getElementById('home-view');
            const giverFormView = document.getElementById('giver-form-view');
            const seekerFormView = document.getElementById('seeker-form-view');
            const aboutView = document.getElementById('about-view'); 
            const contactView = document.getElementById('contact-view'); 

            const houseGiversCard = document.getElementById('house-givers-card');
            const houseSeekersCard = document.getElementById('house-seekers-card');

            const giverForm = document.getElementById('giver-form');
            const seekerForm = document.getElementById('seeker-form');

            const giverMatchesSection = document.getElementById('giver-matches-section');
            const giverMatchesResults = document.getElementById('giver-matches-results');
            const showGiverRawDataButton = document.getElementById('show-giver-raw-data');
            const giverRawDataOutput = document.getElementById('giver-raw-data-output');

            const seekerMatchesSection = document.getElementById('seeker-matches-section');
            const seekerMatchesResults = document.getElementById('seeker-matches-results');
            const showSeekerRawDataButton = document.getElementById('show-seeker-raw-data');
            const seekerRawDataOutput = document.getElementById('seeker-raw-data-output');

            const backToHomeFromGiver = document.getElementById('back-to-home-from-giver');
            const backToHomeFromSeeker = document.getElementById('back-to-home-from-seeker');
            const backToHomeFromAbout = document.getElementById('back-to-home-from-about'); 
            const backToHomeFromContact = document.getElementById('back-to-home-from-contact'); 

            const navHomeLink = document.getElementById('nav-home-link'); 
            const navAboutLink = document.getElementById('nav-about-link'); 
            const navContactLink = document.getElementById('nav-contact-link'); 

            const giverRegionSelect = document.getElementById('giver-region');
            const seekerRegionSelect = document.getElementById('seeker-region');

            const contactModal = document.getElementById('contact-modal'); 
            const closeModalButton = document.getElementById('close-modal'); 
            const modalTitle = document.getElementById('modal-title');
            const modalRecipientInfo = document.getElementById('modal-recipient-info');
            const modalMessageInput = document.getElementById('modal-message-input');
            const sendMessageButton = document.getElementById('send-message-button');
            const modalConfirmationMessage = document.getElementById('modal-confirmation-message');
            const modalErrorMessage = document.getElementById('modal-error-message'); 

            // QR Code elements
            const showQrButton = document.getElementById('show-qr-button');
            const qrCodeContainer = document.getElementById('qr-code-container');
            const qrCodeCanvas = document.getElementById('qr-code-canvas');

            let currentPerspective = null; 
            let lastGiverMatches = []; // Store last matches for raw data display
            let lastSeekerMatches = []; // Store last matches for raw data display

            // --- Georgian Regions Data ---
            const georgianRegions = [
                "Abkhazia", "Adjara", "Guria", "Imereti", "Kakheti", "Kvemo Kartli",
                "Mtskheta-Mtianeti", "Racha-Lechkhumi and Kvemo Svaneti", "Samegrelo-Zemo Svaneti",
                "Samtskhe-Javakheti", "Shida Kartli", "Tbilisi"
            ];

            // --- Mock Data for AI Functionality (Expanded for more suggestions) ---
            const mockHouses = [
                { id: 1, address: '123 Oak St', region: 'Tbilisi', details: '2 bedrooms, pet-friendly, small garden, elderly owner needs help with gardening', owner: 'Alice Smith' },
                { id: 2, address: '456 Pine Ave', region: 'Imereti', details: '3 bedrooms, no pets, family-friendly, vacant, close to park', owner: 'Bob Johnson' },
                { id: 3, address: '789 Maple Dr', region: 'Kakheti', details: '1 bedroom apartment, accessible, quiet neighborhood, no specific help needed', owner: 'Charlie Brown' },
                { id: 4, address: '101 Birch Ln', region: 'Shida Kartli', details: '4 bedrooms, rural area, needs light farm help (chickens), spacious yard', owner: 'Diana Prince' },
                { id: 5, address: '222 Cedar Rd', region: 'Tbilisi', details: 'Studio apartment, urban, pet-friendly, independent living', owner: 'Eve Adams' },
                { id: 6, address: '333 Elm St', region: 'Adjara', details: 'Beachfront villa, 5 bedrooms, pool, needs occasional house sitting', owner: 'Frank White' },
                { id: 7, address: '444 Poplar Rd', region: 'Guria', details: 'Traditional house, 2 bedrooms, large plot, needs help with agriculture (tea picking)', owner: 'Grace Black' },
                { id: 8, address: '555 River View', region: 'Samegrelo-Zemo Svaneti', details: '3 bedrooms, riverside, quiet, ideal for remote work, no specific help needed', owner: 'Harry Potter' },
                { id: 9, address: '666 Mountain Pass', region: 'Mtskheta-Mtianeti', details: 'Small cabin, 1 bedroom, remote, needs occasional check-ins for elderly owner', owner: 'Isabella Swan' },
                { id: 10, address: '777 City Center', region: 'Tbilisi', details: 'Modern 2-bedroom flat, fully furnished, no pets, close to public transport, independent living', owner: 'Jack Sparrow' },
                { id: 11, 'address': '888 Vineyard', region: 'Kakheti', details: 'Large house, 4 bedrooms, vineyard, needs help with grape harvesting and wine production', owner: 'Kira Nerys' },
                { id: 12, address: '999 Lakefront', region: 'Racha-Lechkhumi and Kvemo Svaneti', details: 'Cozy cottage, 2 bedrooms, lake access, needs help with boat maintenance and fishing', owner: 'Liam Neeson' },
                { id: 13, address: '111 Rose St', region: 'Tbilisi', details: '3 bedrooms, modern, near metro, needs occasional pet-sitting for a cat', owner: 'Olivia King' },
                { id: 14, address: '222 Daisy Ln', region: 'Imereti', details: 'Historical house, 4 bedrooms, large garden, needs extensive gardening and minor repairs', owner: 'Noah Green' },
                { id: 15, address: '333 Lily Ct', region: 'Kakheti', details: 'Small vineyard cottage, 1 bedroom, needs help with wine bottling and marketing', owner: 'Emma White' },
                { id: 16, address: '444 Tulip Rd', region: 'Adjara', details: 'Coastal apartment, 2 bedrooms, sea view, needs help with rental management', owner: 'Liam Brown' },
                { id: 17, address: '555 Orchid Way', region: 'Guria', details: 'Rural farm, 5 bedrooms, needs help with animal care (sheep, cows) and fencing', owner: 'Sophia Black' },
                { id: 18, address: '666 Jasmine Pl', region: 'Samegrelo-Zemo Svaneti', details: 'Mountain retreat, 2 bedrooms, quiet, needs help with cabin maintenance and firewood', owner: 'Mason Lee' },
                { id: 19, address: '777 Sunflower Blvd', region: 'Mtskheta-Mtianeti', details: 'Village house, 3 bedrooms, needs help with elderly care and cooking', owner: 'Ava Hall' },
                { id: 20, address: '888 Poppy Dr', region: 'Tbilisi', details: 'Luxury penthouse, 3 bedrooms, city views, needs personal assistant services', owner: 'Ethan Kim' },
                { id: 21, address: '999 Lavender St', region: 'Kvemo Kartli', details: 'Small house, 1 bedroom, needs help with basic household chores and companionship', owner: 'Isabella Garcia' },
                { id: 22, address: '1010 Willow Ave', region: 'Samtskhe-Javakheti', details: 'Farmhouse, 4 bedrooms, needs help with crop harvesting (potatoes) and machinery repair', owner: 'Lucas Martinez' },
                { id: 23, address: '1111 Cypress Rd', region: 'Shida Kartli', details: 'Country estate, 6 bedrooms, needs security and property oversight', owner: 'Amelia Rodriguez' },
                { id: 24, address: '1212 Palm Ct', region: 'Tbilisi', details: 'Modern villa, 4 bedrooms, pool, needs pool maintenance and garden landscaping', owner: 'Benjamin Wilson' },
                { id: 25, address: '1313 Olive Ln', region: 'Imereti', details: 'Traditional village home, 2 bedrooms, needs help with local market errands and cooking', owner: 'Harper Moore' },
                { id: 26, address: '1414 Cherry Blossom', region: 'Kakheti', details: 'Guest house, 3 bedrooms, needs help with tourist management and cleaning', owner: 'Leo Parker' },
                { id: 27, address: '1515 Sunflower', region: 'Guria', details: 'Tea plantation house, 2 bedrooms, needs help with tea processing and farm maintenance', owner: 'Chloe Brown' },
                { id: 28, address: '1616 Vineyard View', region: 'Kakheti', details: 'Luxury villa, 5 bedrooms, needs professional wine expert for vineyard management', owner: 'Daniel Green' },
                { id: 29, address: '1717 Riverside Cabin', region: 'Mtskheta-Mtianeti', details: 'Secluded cabin, 1 bedroom, needs occasional check-up and minor repairs, elderly owner', owner: 'Zoe Davis' },
                { id: 30, address: '1818 Urban Loft', region: 'Tbilisi', details: 'Modern loft, 1 bedroom, no pets, independent living, close to cafes', owner: 'Felix White' }
            ];

            const mockSeekers = [
                { id: 101, name: 'John Doe', region: 'Tbilisi', needs: '1-2 bedrooms, pet-friendly (cat), quiet area', helpOffer: 'Can help with light cleaning' },
                { id: 102, name: 'Jane Miller', region: 'Imereti', needs: '3 bedrooms, family-friendly, close to schools', helpOffer: 'No help offered' },
                { id: 103, name: 'Peter Jones', region: 'Kakheti', needs: 'Accessible 1 bedroom, prefer urban area, willing to help with chores for elders', helpOffer: 'Can provide household chores and companionship' },
                { id: 104, name: 'Sarah Lee', region: 'Shida Kartli', needs: 'Rural living, space for chickens, 3+ bedrooms', helpOffer: 'Experienced in gardening and farm help' },
                { id: 105, name: 'Mike Green', region: 'Tbilisi', needs: 'Any size, must be pet-friendly (dog)', helpOffer: 'No specific help offered' },
                { id: 106, name: 'Olga Petrova', region: 'Adjara', needs: 'Temporary housing, willing to house sit', helpOffer: 'Reliable house sitting, plant care' },
                { id: 107, name: 'David Kim', region: 'Guria', needs: 'Small house, interested in farming', helpOffer: 'Experienced in agriculture, especially tea cultivation' },
                { id: 108, name: 'Emily White', region: 'Samegrelo-Zemo Svaneti', needs: 'Quiet place for remote work, good internet, 2-3 bedrooms', helpOffer: 'Tech support, general maintenance' },
                { id: 109, name: 'Frank Brown', region: 'Mtskheta-Mtianeti', needs: 'Remote cabin, willing to check on elderly residents', helpOffer: 'Regular check-ins, light repairs, companionship' },
                { id: 110, name: 'Grace Davis', region: 'Tbilisi', needs: 'Modern flat, 2 bedrooms, close to city center, no pets', helpOffer: 'No specific help offered' },
                { id: 111, name: 'Chris Evans', region: 'Kakheti', needs: 'Large house with land, interested in winemaking', helpOffer: 'Experienced in viticulture and wine production' },
                { id: 112, name: 'Laura Wilson', region: 'Racha-Lechkhumi and Kvemo Svaneti', needs: 'Cottage near lake, enjoys fishing and boating', helpOffer: 'Boat maintenance, fishing assistance' },
                { id: 113, name: 'Ava Taylor', region: 'Tbilisi', needs: '2-3 bedrooms, modern, near public transport, pet-friendly (cat)', helpOffer: 'Experienced cat sitter, light household chores' },
                { id: 114, name: 'William Clark', region: 'Imereti', needs: 'Any size, interested in historical properties, willing to do repairs and gardening', helpOffer: 'Skilled in repairs, extensive gardening experience' },
                { id: 115, name: 'Mia Hall', region: 'Kakheti', needs: 'Small living space, interested in wine industry', helpOffer: 'Marketing and logistics support for small businesses, wine bottling' },
                { id: 116, name: 'James Lewis', region: 'Adjara', needs: 'Coastal living, willing to help with property management', helpOffer: 'Experienced in property management and guest relations, rental management' },
                { id: 117, name: 'Charlotte Young', region: 'Guria', needs: 'Farm experience preferred, seeking rural living', helpOffer: 'Experienced in animal husbandry, fencing, and farm maintenance' },
                { id: 118, name: 'Daniel White', region: 'Samegrelo-Zemo Svaneti', needs: 'Quiet mountain retreat, 2 bedrooms', helpOffer: 'Handyman skills, can chop firewood, cabin maintenance' },
                { id: 119, name: 'Sophie Green', region: 'Mtskheta-Mtianeti', needs: 'Village living, willing to assist elders', helpOffer: 'Experienced in elderly care, cooking, and household help' },
                { id: 120, name: 'Oliver King', region: 'Tbilisi', needs: 'Luxury accommodation, 3 bedrooms, city views', helpOffer: 'Professional personal assistant services, administrative support' },
                { id: 121, name: 'Chloe Adams', region: 'Kvemo Kartli', needs: 'Small house, quiet environment', helpOffer: 'Basic household chores, friendly companionship' },
                { id: 122, name: 'Henry Baker', region: 'Samtskhe-Javakheti', needs: 'Farm living, interested in agriculture', helpOffer: 'Experienced in crop harvesting, machinery repair' },
                { id: 123, name: 'Ella Carter', region: 'Shida Kartli', needs: 'Country estate, large property', helpOffer: 'Security services, property oversight, general maintenance' },
                { id: 124, name: 'Jackson Evans', region: 'Tbilisi', needs: 'Villa with pool, modern amenities', helpOffer: 'Pool maintenance, garden landscaping, general property upkeep' },
                { id: 125, name: 'Scarlett Fisher', region: 'Imereti', needs: 'Traditional home, community-oriented', helpOffer: 'Assistance with errands, local market shopping, cooking traditional meals' },
                { id: 126, name: 'Noah Davis', region: 'Kakheti', needs: 'Seeking temporary accommodation in a guest house, willing to help with cleaning', helpOffer: 'Cleaning, guest relations' },
                { id: 127, name: 'Lily Evans', region: 'Guria', needs: 'Interested in learning tea processing, seeking farm stay', helpOffer: 'Farm work, tea processing' },
                { id: 128, name: 'Samuel Wilson', region: 'Kakheti', needs: 'Looking for a large property to manage a vineyard', helpOffer: 'Experienced wine expert, vineyard management' },
                { id: 129, name: 'Hannah Moore', region: 'Mtskheta-Mtianeti', needs: 'Quiet cabin, willing to help elderly residents with occasional check-ups', helpOffer: 'Light repairs, companionship, check-ups' },
                { id: 130, name: 'Leo Taylor', region: 'Tbilisi', needs: 'Small urban apartment, independent living, close to amenities', helpOffer: 'No specific help offered' }
            ];

            // --- Populate Region Dropdowns ---
            const populateRegions = () => {
                // Clear existing options first to prevent duplicates on re-render if any
                giverRegionSelect.innerHTML = '<option value="">Choose a Region</option>';
                seekerRegionSelect.innerHTML = '<option value="">Choose a Region</option>';

                georgianRegions.forEach(region => {
                    const optionGiver = document.createElement('option');
                    optionGiver.value = region;
                    optionGiver.textContent = region;
                    giverRegionSelect.appendChild(optionGiver);

                    const optionSeeker = document.createElement('option');
                    optionSeeker.value = region;
                    optionSeeker.textContent = region;
                    seekerRegionSelect.appendChild(optionSeeker);
                });
                // Add "Other" option
                const otherOptionGiver = document.createElement('option');
                otherOptionGiver.value = 'Other';
                otherOptionGiver.textContent = 'Other';
                giverRegionSelect.appendChild(otherOptionGiver);

                const otherOptionSeeker = document.createElement('option');
                otherOptionSeeker.value = 'Other';
                otherOptionSeeker.textContent = 'Other';
                seekerRegionSelect.appendChild(otherOptionSeeker);
            };

            // --- Weighted Keywords for Matching ---
            const weightedKeywords = [
                // Core needs/offers (higher weight)
                { keyword: 'bedroom', weight: 3 },
                { keyword: 'rooms', weight: 3 },
                { keyword: 'pet-friendly', weight: 5 },
                { keyword: 'pets', weight: 5 },
                { keyword: 'elderly care', weight: 7 }, // covers 'elderly owner', 'companionship', 'care for elders'
                { keyword: 'gardening', weight: 4 },
                { keyword: 'household chores', weight: 4 },
                { keyword: 'farm help', weight: 5 },
                { keyword: 'house sitting', weight: 5 },
                { keyword: 'accessible', weight: 4 },

                // Amenities/Location (medium weight)
                { keyword: 'urban', weight: 2 },
                { keyword: 'rural', weight: 2 },
                { keyword: 'remote work', weight: 3 },
                { keyword: 'city center', weight: 2 },
                { keyword: 'vineyard', weight: 3 },
                { keyword: 'lake access', weight: 3 },
                { keyword: 'pool', weight: 3 },
                { keyword: 'yard', weight: 2 },
                { keyword: 'metro', weight: 2 },
                { keyword: 'park', weight: 2 },
                { keyword: 'beachfront', weight: 3 },
                { keyword: 'riverside', weight: 3 },
                { keyword: 'mountain', weight: 2 },
                { keyword: 'village', weight: 2 },
                { keyword: 'guest house', weight: 3 },
                { keyword: 'tea plantation', weight: 3 },
                { keyword: 'loft', weight: 2 },
                { keyword: 'villa', weight: 3 },
                { keyword: 'cabin', weight: 2 },


                // Specific tasks (medium weight)
                { keyword: 'cleaning', weight: 3 },
                { keyword: 'repairs', weight: 4 },
                { keyword: 'marketing', weight: 3 },
                { keyword: 'rental management', weight: 4 },
                { keyword: 'animal care', weight: 5 },
                { keyword: 'fencing', weight: 3 },
                { keyword: 'cabin maintenance', weight: 4 },
                { keyword: 'firewood', weight: 3 },
                { keyword: 'cooking', weight: 3 },
                { keyword: 'personal assistant', weight: 5 },
                { keyword: 'crop harvesting', weight: 5 },
                { keyword: 'machinery repair', weight: 5 },
                { keyword: 'security', weight: 4 },
                { keyword: 'property oversight', weight: 4 },
                { keyword: 'landscaping', weight: 4 },
                { keyword: 'errands', weight: 2 },
                { keyword: 'market shopping', weight: 2 },
                { keyword: 'pet-sit', weight: 5 }, // For seeker's offer
                { keyword: 'wine bottling', weight: 4 },
                { keyword: 'tourist management', weight: 4 },
                { keyword: 'tea processing', weight: 5 },
                { keyword: 'vineyard management', weight: 6 }
            ];

            // Calculate Max Possible Score for Percentage Calculation
            const MAX_REGION_SCORE = 20; // High weight for region match
            let MAX_KEYWORD_SCORE = 0;
            weightedKeywords.forEach(item => {
                MAX_KEYWORD_SCORE += item.weight;
            });
            const MAX_TOTAL_SCORE = MAX_REGION_SCORE + MAX_KEYWORD_SCORE;

            // --- AI Matching Logic (Simulated with Score-based Filtering) ---
            const calculateMatchScore = (queryText, targetText, targetRegion, userRegion) => {
                let score = 0;
                const lowerCaseQuery = queryText.toLowerCase();
                const lowerCaseTarget = targetText.toLowerCase();

                // Region Match
                if (userRegion && userRegion !== "" && targetRegion === userRegion) {
                    score += MAX_REGION_SCORE;
                } else if (userRegion === 'Other' || targetRegion === 'Other') {
                    // If either is 'Other', give a small base score for potential match
                    score += MAX_REGION_SCORE / 4; 
                }

                // Keyword Matches
                weightedKeywords.forEach(item => {
                    const keyword = item.keyword;
                    const weight = item.weight;

                    // Check if keyword is present in both user's description and target's details/needs/offers
                    if (lowerCaseQuery.includes(keyword) && lowerCaseTarget.includes(keyword)) {
                        score += weight;
                    }
                });
                return score;
            };

            const suggestMatches = (userType, userData) => {
                let matches = [];
                const userDescription = (userData.description || '').toLowerCase();
                const userRegion = userData.region; 

                if (userType === 'seeker') {
                    matches = mockHouses.map(house => {
                        const houseDetails = house.details.toLowerCase();
                        const score = calculateMatchScore(userDescription, houseDetails, house.region, userRegion);
                        // Ensure percentage is not more than 100
                        const percentage = Math.min(100, MAX_TOTAL_SCORE > 0 ? Math.round((score / MAX_TOTAL_SCORE) * 100) : 0);
                        return { ...house, score: score, percentage: percentage };
                    });
                } else if (userType === 'giver') {
                    matches = mockSeekers.map(seeker => {
                        const seekerCombinedText = `${seeker.needs} ${seeker.helpOffer || ''}`.toLowerCase();
                        const score = calculateMatchScore(userDescription, seekerCombinedText, seeker.region, userRegion);
                        // Ensure percentage is not more than 100
                        const percentage = Math.min(100, MAX_TOTAL_SCORE > 0 ? Math.round((score / MAX_TOTAL_SCORE) * 100) : 0);
                        return { ...seeker, score: score, percentage: percentage };
                    });
                }
                // Sort by score descending, then by ID for consistent ordering if scores are equal
                return matches.sort((a, b) => b.score - a.score || a.id - b.id);
            };

            // --- UI and View Management ---
            const updateNavHomeLink = () => {
                if (currentPerspective === 'giver') {
                    navHomeLink.textContent = 'Home (Giver)';
                } else if (currentPerspective === 'seeker') {
                    navHomeLink.textContent = 'Home (Seeker)';
                } else {
                    navHomeLink.textContent = 'Home'; // Default text
                }
            };

            const showView = (viewToShow) => {
                // Hide all main views
                homeView.classList.add('hidden');
                giverFormView.classList.add('hidden');
                seekerFormView.classList.add('hidden');
                aboutView.classList.add('hidden'); 
                contactView.classList.add('hidden'); 

                // Remove flex class from all views
                homeView.classList.remove('flex');
                giverFormView.classList.remove('flex');
                seekerFormView.classList.remove('flex');
                aboutView.classList.remove('flex');
                contactView.classList.remove('flex');

                // Hide matches section when changing view
                giverMatchesSection.classList.add('hidden'); 
                seekerMatchesSection.classList.add('hidden'); 

                // Hide raw data output when changing view
                giverRawDataOutput.classList.add('hidden');
                seekerRawDataOutput.classList.add('hidden');

                // Hide QR code container when changing view
                qrCodeContainer.classList.add('hidden');

                // Show the requested view
                viewToShow.classList.remove('hidden');
                viewToShow.classList.add('flex');
            };

            // Event listener for House Givers card
            houseGiversCard.addEventListener('click', () => {
                currentPerspective = 'giver';
                updateNavHomeLink();
                showView(giverFormView);
                giverForm.reset(); // Clear form on new entry
            });

            // Event listener for House Seekers card
            houseSeekersCard.addEventListener('click', () => {
                currentPerspective = 'seeker';
                updateNavHomeLink();
                showView(seekerFormView);
                seekerForm.reset(); // Clear form on new entry
            });

            // --- Form Submission Logic ---
            giverForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission

                const giverRegion = giverRegionSelect.value; 
                const giverDescription = document.getElementById('giver-description').value;

                const giverData = {
                    region: giverRegion, 
                    description: giverDescription
                };

                // Simulate AI match
                const matches = suggestMatches('giver', giverData);
                lastGiverMatches = matches; // Store matches
                
                giverMatchesResults.innerHTML = ''; // Clear previous results

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const matchCard = `
                            <div class="bg-blue-100 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
                                <div>
                                    <p class="font-semibold text-blue-800">${match.name} (ID: ${match.id})</p>
                                    <p class="text-gray-700 text-sm">Region: ${match.region}</p>
                                    <p class="text-700 text-sm">Needs: ${match.needs}</p>
                                    <p class="text-gray-700 text-sm">Offer to Help: ${match.helpOffer || 'N/A'}</p>
                                    <p class="text-green-700 text-sm font-bold">Matching Points: ${match.percentage}%</p>
                                </div>
                                <button class="contact-button bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out shadow-md" 
                                        data-contact-type="seeker" 
                                        data-contact-name="${match.name}" 
                                        data-contact-id="${match.id}">
                                    Contact
                                </button>
                            </div>
                        `;
                        giverMatchesResults.innerHTML += matchCard;
                    });
                    addContactButtonListeners(); // Add listeners after rendering
                } else {
                    giverMatchesResults.innerHTML = '<p class="text-gray-600 text-center">No matching seekers found at the moment. Please try adjusting your description or region.</p>';
                }
                giverMatchesSection.classList.remove('hidden'); // Show matches section
            });

            seekerForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission

                const seekerRegion = seekerRegionSelect.value; 
                const seekerDescription = document.getElementById('seeker-description').value;

                const seekerData = {
                    region: seekerRegion, 
                    description: seekerDescription
                };

                // Simulate AI match
                const matches = suggestMatches('seeker', seekerData);
                lastSeekerMatches = matches; // Store matches

                seekerMatchesResults.innerHTML = ''; // Clear previous results

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const matchCard = `
                            <div class="bg-purple-100 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
                                <div>
                                    <p class="font-semibold text-purple-800">${match.address} (Owner: ${match.owner})</p>
                                    <p class="text-gray-700 text-sm">Region: ${match.region}</p>
                                    <p class="text-gray-700 text-sm">Details: ${match.details}</p>
                                    <p class="text-green-700 text-sm font-bold">Matching Points: ${match.percentage}%</p>
                                </div>
                                <button class="contact-button bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-300 ease-in-out shadow-md"
                                        data-contact-type="house"
                                        data-contact-address="${match.address}"
                                        data-contact-owner="${match.owner}">
                                    Contact
                                </button>
                            </div>
                        `;
                        seekerMatchesResults.innerHTML += matchCard;
                    });
                    addContactButtonListeners(); // Add listeners after rendering
                } else {
                    seekerMatchesResults.innerHTML = '<p class="text-gray-600 text-center">No matching homes found at the moment. Please try adjusting your description or region.</p>';
                }
                seekerMatchesSection.classList.remove('hidden'); // Show matches section
            });

            // --- Contact Modal Logic ---
            const showContactModal = (type, recipientName, recipientAddress, recipientOwner) => {
                modalMessageInput.value = ''; // Clear previous message
                modalConfirmationMessage.classList.add('hidden'); // Hide confirmation message
                modalErrorMessage.classList.add('hidden'); // Hide error message

                if (type === 'seeker') {
                    modalTitle.textContent = `Contact ${recipientName}`;
                    modalRecipientInfo.textContent = `You are sending a message to ${recipientName}.`;
                } else if (type === 'house') {
                    modalTitle.textContent = `Contact Owner of ${recipientAddress}`;
                    modalRecipientInfo.textContent = `You are sending a message to ${recipientOwner} about ${recipientAddress}.`;
                }
                contactModal.classList.remove('hidden');
            };

            const hideContactModal = () => {
                contactModal.classList.add('hidden');
            };

            closeModalButton.addEventListener('click', hideContactModal);

            sendMessageButton.addEventListener('click', () => {
                const message = modalMessageInput.value;
                if (message.trim() === '') {
                    modalErrorMessage.classList.remove('hidden'); // Show error
                    modalConfirmationMessage.classList.add('hidden'); // Hide confirmation
                    return;
                }
                // Simulate sending message
                console.log('Message sent:', message);
                modalErrorMessage.classList.add('hidden'); // Hide error
                modalConfirmationMessage.classList.remove('hidden'); // Show confirmation
                modalMessageInput.value = ''; // Clear input after sending
                // Optionally, hide the modal after a short delay
                setTimeout(() => {
                    hideContactModal();
                }, 2000); 
            });

            // Function to add event listeners to dynamically created contact buttons
            const addContactButtonListeners = () => {
                document.querySelectorAll('.contact-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const type = event.target.dataset.contactType;
                        const name = event.target.dataset.contactName;
                        const address = event.target.dataset.contactAddress;
                        const owner = event.target.dataset.contactOwner; 
                        showContactModal(type, name, address, owner);
                    });
                });
            };


            // --- "Back to Home" Buttons ---
            backToHomeFromGiver.addEventListener('click', () => {
                currentPerspective = null; 
                updateNavHomeLink();
                showView(homeView);
            });

            backToHomeFromSeeker.addEventListener('click', () => {
                currentPerspective = null; 
                updateNavHomeLink();
                showView(homeView);
            });

            backToHomeFromAbout.addEventListener('click', () => {
                currentPerspective = null; 
                updateNavHomeLink();
                showView(homeView);
            });

            backToHomeFromContact.addEventListener('click', () => {
                currentPerspective = null; 
                updateNavHomeLink();
                showView(homeView);
            });

            // Event listener for the "Home" link in the navigation bar
            navHomeLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                currentPerspective = null; // Reset perspective
                updateNavHomeLink(); // Update nav link text
                showView(homeView); // Show the home view
            });

            // Event listener for the "About" link in the navigation bar
            navAboutLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                currentPerspective = null; // Reset perspective
                updateNavHomeLink(); // Update nav link text
                showView(aboutView); // Show the about view
            });

            // Event listener for the "Contact" link in the navigation bar
            navContactLink.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                currentPerspective = null; // Reset perspective
                updateNavHomeLink(); // Update nav link text
                showView(contactView); // Show the contact view
            });

            // --- QR Code Generation Logic ---
            showQrButton.addEventListener('click', () => {
                if (qrCodeContainer.classList.contains('hidden')) {
                    // Replace with your actual Canvas app URL for presentation
                    const appUrl = 'https://your-canvas-app-url.com'; 
                    
                    new QRious({
                        element: qrCodeCanvas,
                        value: appUrl,
                        size: 200, // Adjust size as needed
                        background: 'white',
                        foreground: 'black'
                    });
                    qrCodeContainer.classList.remove('hidden');
                } else {
                    qrCodeContainer.classList.add('hidden');
                }
            });

            // --- Raw Data Display Logic ---
            showGiverRawDataButton.addEventListener('click', () => {
                if (giverRawDataOutput.classList.contains('hidden')) {
                    giverRawDataOutput.textContent = JSON.stringify(lastGiverMatches, null, 2);
                    giverRawDataOutput.classList.remove('hidden');
                } else {
                    giverRawDataOutput.classList.add('hidden');
                }
            });

            showSeekerRawDataButton.addEventListener('click', () => {
                if (seekerRawDataOutput.classList.contains('hidden')) {
                    seekerRawDataOutput.textContent = JSON.stringify(lastSeekerMatches, null, 2);
                    seekerRawDataOutput.classList.remove('hidden');
                } else {
                    seekerRawDataOutput.classList.add('hidden');
                }
            });


            // Initial calls on page load
            populateRegions(); 
            updateNavHomeLink();
        });
    