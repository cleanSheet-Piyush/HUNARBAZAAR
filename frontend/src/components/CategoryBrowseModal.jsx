import React, { useState } from "react";
import { createPortal } from "react-dom";

const CATEGORY_PRODUCTS = {
  "Oil painting": [
    { id: "oil1", title: "Radha Krishna Eternal Union", artist: "Ramesh Kumar Sharma", region: "Jaipur, Rajasthan", price: 3200, original: 4000, rating: 4.8, reviews: 24, img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Radha_and_Krishna_by_DHURANDHAR_MV.jpg", badge: "Bestseller", size: "24x18 inch", medium: "Oil on canvas", delivery: "5-7 days" },
    { id: "oil2", title: "Village Morning Harvest", artist: "Sunita Devi", region: "Varanasi, UP", price: 2100, original: 2800, rating: 4.5, reviews: 12, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Village_Scene_by_Raja_Ravi_Varma.jpg/800px-Village_Scene_by_Raja_Ravi_Varma.jpg", badge: null, size: "18x14 inch", medium: "Oil on canvas board", delivery: "4-6 days" },
    { id: "oil3", title: "Himalayan Serenity", artist: "Vikram Negi", region: "Shimla, HP", price: 4500, original: 5500, rating: 4.9, reviews: 31, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500", badge: "Top Rated", size: "30x24 inch", medium: "Oil on canvas", delivery: "7-10 days" },
    { id: "oil4", title: "Benaras Ghat at Dusk", artist: "Mohan Das Gupta", region: "Varanasi, UP", price: 5800, original: 7000, rating: 4.7, reviews: 18, img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=500", badge: "Featured", size: "36x24 inch", medium: "Oil on canvas", delivery: "6-8 days" },
    { id: "oil5", title: "Peacock in Monsoon", artist: "Priya Mehta", region: "Udaipur, Rajasthan", price: 1800, original: null, rating: 4.3, reviews: 8, img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500", badge: "New", size: "16x12 inch", medium: "Oil on board", delivery: "3-5 days" },
    { id: "oil6", title: "Mother and Child", artist: "Ananya Roy", region: "Kolkata, WB", price: 6500, original: 8000, rating: 5.0, reviews: 41, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Raja_Ravi_Varma_-_Galaxy_of_Musicians.jpg/800px-Raja_Ravi_Varma_-_Galaxy_of_Musicians.jpg", badge: "Award Winner", size: "24x20 inch", medium: "Oil on linen", delivery: "5-8 days" },
  ],
  "Acrylic painting": [
    { id: "ac1", title: "Lord Ganesha in Gold", artist: "Deepak Verma", region: "Pune, Maharashtra", price: 1500, original: 2000, rating: 4.6, reviews: 19, img: "https://images.unsplash.com/photo-1603201667141-5324a42a2ebe?q=80&w=500", badge: "Bestseller", size: "18x18 inch", medium: "Acrylic on canvas", delivery: "3-5 days" },
    { id: "ac2", title: "Abstract Monsoon", artist: "Kavitha Rajan", region: "Chennai, TN", price: 900, original: null, rating: 4.2, reviews: 7, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=500", badge: "New", size: "12x12 inch", medium: "Acrylic on canvas board", delivery: "3-4 days" },
    { id: "ac3", title: "Tribal Harvest Dance", artist: "Suresh Gond", region: "Jabalpur, MP", price: 2400, original: 3000, rating: 4.7, reviews: 14, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gond_painting_by_Bhajju_Shyam.jpg/800px-Gond_painting_by_Bhajju_Shyam.jpg", badge: null, size: "20x16 inch", medium: "Acrylic on canvas", delivery: "4-6 days" },
    { id: "ac4", title: "Lotus Pond at Sunrise", artist: "Meena Kumari", region: "Bhopal, MP", price: 3200, original: 4000, rating: 4.8, reviews: 22, img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=500", badge: "Featured", size: "24x18 inch", medium: "Acrylic on canvas", delivery: "5-7 days" },
    { id: "ac5", title: "Durga Mahishasura Mardini", artist: "Ranjit Biswas", region: "Kolkata, WB", price: 4100, original: 5000, rating: 4.9, reviews: 33, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Durga_by_Raja_Ravi_Varma.jpg/800px-Durga_by_Raja_Ravi_Varma.jpg", badge: "Top Rated", size: "30x24 inch", medium: "Acrylic on cotton canvas", delivery: "6-9 days" },
    { id: "ac6", title: "Village Market Scene", artist: "Geeta Sharma", region: "Jaipur, Rajasthan", price: 1200, original: 1500, rating: 4.4, reviews: 11, img: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=500", badge: null, size: "14x11 inch", medium: "Acrylic on paper", delivery: "2-4 days" },
  ],
  "Watercolor painting": [
    { id: "wc1", title: "Rajasthani Haveli Morning Light", artist: "Lalitha Krishnan", region: "Jodhpur, Rajasthan", price: 1400, original: 1800, rating: 4.7, reviews: 17, img: "https://images.unsplash.com/photo-1524492412937-b28074a47d70?q=80&w=500", badge: "Bestseller", size: "15x11 inch", medium: "Watercolor on rag paper", delivery: "3-4 days" },
    { id: "wc2", title: "Botanical Indian Jasmine", artist: "Preethi Nair", region: "Kochi, Kerala", price: 800, original: null, rating: 4.5, reviews: 9, img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=500", badge: "New", size: "10x8 inch", medium: "Watercolor on handmade paper", delivery: "2-3 days" },
    { id: "wc3", title: "Backwaters of Kerala", artist: "Rajan Pillai", region: "Alleppey, Kerala", price: 2200, original: 2800, rating: 4.8, reviews: 26, img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=500", badge: "Top Rated", size: "18x12 inch", medium: "Watercolor on 300gsm", delivery: "4-6 days" },
    { id: "wc4", title: "Birds of the Sundarbans", artist: "Mrinal Roy", region: "Kolkata, WB", price: 1700, original: 2100, rating: 4.6, reviews: 13, img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=500", badge: null, size: "14x10 inch", medium: "Watercolor on paper", delivery: "3-5 days" },
    { id: "wc5", title: "Monsoon Market Benaras", artist: "Divya Mishra", region: "Varanasi, UP", price: 3000, original: 3600, rating: 4.9, reviews: 28, img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=500", badge: "Featured", size: "20x14 inch", medium: "Watercolor on 640gsm", delivery: "5-7 days" },
    { id: "wc6", title: "Floral Mandala", artist: "Anita Patil", region: "Pune, Maharashtra", price: 600, original: 800, rating: 4.3, reviews: 6, img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500", badge: null, size: "8x8 inch", medium: "Watercolor on paper", delivery: "2-3 days" },
  ],
  "Pastel art": [
    { id: "pa1", title: "Old Woman of Rajasthan", artist: "Bhavna Solanki", region: "Jodhpur, Rajasthan", price: 2200, original: 2800, rating: 4.8, reviews: 15, img: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?q=80&w=500", badge: "Top Rated", size: "16x12 inch", medium: "Soft pastel on toned paper", delivery: "4-5 days" },
    { id: "pa2", title: "Sunrise Over Thar Desert", artist: "Narendra Singh", region: "Jaisalmer, Rajasthan", price: 3100, original: 3800, rating: 4.9, reviews: 21, img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=500", badge: "Featured", size: "20x14 inch", medium: "Dry pastel on Canson", delivery: "5-7 days" },
    { id: "pa3", title: "Young Dancer of Manipur", artist: "Bimala Devi", region: "Imphal, Manipur", price: 1800, original: null, rating: 4.6, reviews: 10, img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500", badge: null, size: "14x10 inch", medium: "Oil pastel on cartridge", delivery: "3-5 days" },
    { id: "pa4", title: "Sacred Lotus in Full Bloom", artist: "Rekha Tripathi", region: "Lucknow, UP", price: 1200, original: 1500, rating: 4.4, reviews: 8, img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=500", badge: "New", size: "12x10 inch", medium: "Soft pastel on paper", delivery: "2-4 days" },
    { id: "pa5", title: "Tiger at Dusk", artist: "Rajiv Nair", region: "Kochi, Kerala", price: 4500, original: 5500, rating: 5.0, reviews: 37, img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=500", badge: "Award Winner", size: "24x18 inch", medium: "Pastel on velour paper", delivery: "6-8 days" },
    { id: "pa6", title: "Festival of Colours", artist: "Shalini Gupta", region: "Mathura, UP", price: 900, original: 1200, rating: 4.3, reviews: 6, img: "https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=500", badge: null, size: "10x8 inch", medium: "Oil pastel on paper", delivery: "2-3 days" },
  ],
  "Finger painting": [
    { id: "fp1", title: "Forest Spirit Saura Tribe", artist: "Madan Saura", region: "Rayagada, Odisha", price: 1200, original: 1500, rating: 4.7, reviews: 13, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Warli_painting.jpg/800px-Warli_painting.jpg", badge: "Tribal Art", size: "15x11 inch", medium: "Natural pigment finger technique", delivery: "4-6 days" },
    { id: "fp2", title: "Warli Village Life Finger", artist: "Jyoti Warli", region: "Palghar, Maharashtra", price: 800, original: null, rating: 4.5, reviews: 9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warli-Painting.jpg/800px-Warli-Painting.jpg", badge: "New", size: "12x9 inch", medium: "Finger on handmade paper", delivery: "3-4 days" },
    { id: "fp3", title: "Bhil Animals Panorama", artist: "Soni Bhil", region: "Ratlam, MP", price: 1600, original: 2000, rating: 4.8, reviews: 16, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bhil_Pithora_painting.jpg/800px-Bhil_Pithora_painting.jpg", badge: "Bestseller", size: "18x9 inch", medium: "Natural dye finger painting", delivery: "4-6 days" },
    { id: "fp4", title: "Sacred Tree of Life", artist: "Tulsi Devi", region: "Madhubani, Bihar", price: 950, original: 1200, rating: 4.4, reviews: 7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Madhubani_painting.jpg/800px-Madhubani_painting.jpg", badge: null, size: "11x8 inch", medium: "Rice paste finger technique", delivery: "3-5 days" },
    { id: "fp5", title: "Celebration of Harvest", artist: "Kamla Maity", region: "Midnapore, WB", price: 2100, original: 2600, rating: 4.9, reviews: 22, img: "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?q=80&w=500", badge: "Featured", size: "20x15 inch", medium: "Natural pigment finger art", delivery: "5-7 days" },
    { id: "fp6", title: "Deities in the Forest", artist: "Ramu Gond", region: "Chhindwara, MP", price: 700, original: 900, rating: 4.2, reviews: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gond_painting_by_Bhajju_Shyam.jpg/600px-Gond_painting_by_Bhajju_Shyam.jpg", badge: null, size: "10x7 inch", medium: "Acrylic finger painting", delivery: "2-3 days" },
  ],
  "Graphite sketching": [
    { id: "gs1", title: "Portrait of Varanasi Boatman", artist: "Ajay Mishra", region: "Varanasi, UP", price: 1800, original: 2200, rating: 4.8, reviews: 21, img: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=500", badge: "Top Rated", size: "15x11 inch", medium: "Graphite on cartridge", delivery: "3-5 days" },
    { id: "gs2", title: "Konark Temple Study", artist: "Bibhuti Panda", region: "Puri, Odisha", price: 2500, original: 3000, rating: 4.9, reviews: 18, img: "https://images.unsplash.com/photo-1591018653199-4d5d5cb9b42f?q=80&w=500", badge: "Featured", size: "18x12 inch", medium: "Graphite pencil 6H to 8B", delivery: "4-6 days" },
    { id: "gs3", title: "Botanical Ashoka Leaf Series", artist: "Priya Suresh", region: "Bengaluru, Karnataka", price: 900, original: null, rating: 4.5, reviews: 11, img: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?q=80&w=500", badge: "New", size: "10x8 inch", medium: "Graphite on watercolor paper", delivery: "2-3 days" },
    { id: "gs4", title: "Old Craftsman at Work", artist: "Dinesh Yadav", region: "Agra, UP", price: 3200, original: 4000, rating: 4.7, reviews: 25, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500", badge: "Bestseller", size: "20x16 inch", medium: "Graphite and charcoal blend", delivery: "5-7 days" },
    { id: "gs5", title: "Lotus Pond Hyper Realistic", artist: "Tanvi Shah", region: "Ahmedabad, Gujarat", price: 4200, original: 5000, rating: 5.0, reviews: 39, img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=500", badge: "Award Winner", size: "24x18 inch", medium: "Graphite 8B-6H on Bristol", delivery: "6-8 days" },
    { id: "gs6", title: "Village Woman Fetching Water", artist: "Kamla Sahu", region: "Raipur, CG", price: 1200, original: 1500, rating: 4.3, reviews: 8, img: "https://images.unsplash.com/photo-1531844251246-9a1bfacd0421?q=80&w=500", badge: null, size: "12x9 inch", medium: "Pencil sketch on paper", delivery: "2-4 days" },
  ],
  "Charcoal drawing": [
    { id: "cd1", title: "Shiva The Destroyer", artist: "Mahesh Sharma", region: "Haridwar, UK", price: 2200, original: 2800, rating: 4.8, reviews: 19, img: "https://images.unsplash.com/photo-1615552788291-e54d7c0b83b7?q=80&w=500", badge: "Top Rated", size: "18x14 inch", medium: "Compressed charcoal on Mi-Teintes", delivery: "4-5 days" },
    { id: "cd2", title: "Fisherman of Bengal", artist: "Subhash Das", region: "Diamond Harbour, WB", price: 3000, original: 3800, rating: 4.9, reviews: 27, img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=500", badge: "Featured", size: "20x16 inch", medium: "Vine and compressed charcoal", delivery: "5-7 days" },
    { id: "cd3", title: "Tiger in the Mist", artist: "Roshan Nair", region: "Wayanad, Kerala", price: 4800, original: 6000, rating: 5.0, reviews: 44, img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=500", badge: "Award Winner", size: "30x22 inch", medium: "Charcoal on watercolor paper", delivery: "6-9 days" },
    { id: "cd4", title: "Abstract Smoke Form", artist: "Riti Joshi", region: "Dehradun, UK", price: 1600, original: 2000, rating: 4.6, reviews: 12, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500", badge: null, size: "14x11 inch", medium: "Charcoal on toned paper", delivery: "3-5 days" },
    { id: "cd5", title: "Grandmothers Hands", artist: "Lalitha Iyer", region: "Coimbatore, TN", price: 2700, original: 3300, rating: 4.7, reviews: 16, img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=500", badge: "Bestseller", size: "18x14 inch", medium: "Charcoal pencil on Fabriano", delivery: "4-6 days" },
    { id: "cd6", title: "Crow Market Series", artist: "Bipin Sen", region: "Kolkata, WB", price: 1000, original: null, rating: 4.2, reviews: 6, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=500", badge: "New", size: "12x9 inch", medium: "Charcoal sketch on paper", delivery: "2-3 days" },
  ],
  "Zentangle art": [
    { id: "zt1", title: "Lotus Mandala 108 Petals", artist: "Rupa Mehta", region: "Ahmedabad, Gujarat", price: 1500, original: 1900, rating: 4.8, reviews: 23, img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=500", badge: "Bestseller", size: "12x12 inch", medium: "Pigment ink on Bristol", delivery: "3-4 days" },
    { id: "zt2", title: "Kolam-Zentangle Fusion", artist: "Sridevi Anand", region: "Chennai, TN", price: 900, original: null, rating: 4.6, reviews: 14, img: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?q=80&w=500", badge: "New", size: "10x10 inch", medium: "Micron pen on archival paper", delivery: "2-3 days" },
    { id: "zt3", title: "Peacock Zentangle", artist: "Mala Trivedi", region: "Surat, Gujarat", price: 2200, original: 2700, rating: 4.9, reviews: 31, img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500", badge: "Top Rated", size: "16x12 inch", medium: "Ink on 300gsm paper", delivery: "4-5 days" },
    { id: "zt4", title: "Ganesha with Floral Tangle", artist: "Neelam Singh", region: "Jaipur, Rajasthan", price: 1800, original: 2200, rating: 4.7, reviews: 17, img: "https://images.unsplash.com/photo-1603201667141-5324a42a2ebe?q=80&w=500", badge: "Featured", size: "14x12 inch", medium: "Pigment pen on acid-free", delivery: "3-5 days" },
    { id: "zt5", title: "Tree of Life Black and Gold", artist: "Jayashri Rao", region: "Mysore, Karnataka", price: 3200, original: 4000, rating: 5.0, reviews: 38, img: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=500", badge: "Award Winner", size: "20x16 inch", medium: "Gold ink and micron on black", delivery: "5-7 days" },
    { id: "zt6", title: "Bookmarks Set of 6", artist: "Prachi Kulkarni", region: "Pune, Maharashtra", price: 450, original: 600, rating: 4.4, reviews: 9, img: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=500", badge: null, size: "7x2 inch each", medium: "Micron pen on cardstock", delivery: "2-3 days" },
  ],
  "Hand-carved sculpture": [
    { id: "hcs1", title: "Nataraja Dancing Shiva in Teak", artist: "Murugesan Pillai", region: "Kumbakonam, TN", price: 8500, original: 11000, rating: 4.9, reviews: 29, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Shiva_Nataraja_Musee_Guimet_25971.jpg/600px-Shiva_Nataraja_Musee_Guimet_25971.jpg", badge: "GI Tagged", size: "18 inch height", medium: "Teak wood hand-carved", delivery: "7-10 days" },
    { id: "hcs2", title: "Marble Ganesh Jali Work", artist: "Abdul Hamid Mansuri", region: "Agra, UP", price: 12000, original: 15000, rating: 5.0, reviews: 45, img: "https://images.unsplash.com/photo-1603201667141-5324a42a2ebe?q=80&w=500", badge: "Award Winner", size: "12 inch height", medium: "White marble jali carving", delivery: "10-15 days" },
    { id: "hcs3", title: "Dokra Tribal Horseman", artist: "Subal Karmak", region: "Bankura, WB", price: 3200, original: 4000, rating: 4.7, reviews: 18, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Dhokra_artwork.jpg/600px-Dhokra_artwork.jpg", badge: "Bestseller", size: "9 inch height", medium: "Lost-wax metal casting", delivery: "5-8 days" },
    { id: "hcs4", title: "Sandstone Temple Panel", artist: "Ram Kishore Silawat", region: "Jaipur, Rajasthan", price: 18000, original: 22000, rating: 4.8, reviews: 14, img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=500", badge: "Featured", size: "24x18 inch", medium: "Pink sandstone hand-carved", delivery: "14-21 days" },
    { id: "hcs5", title: "Panchabhuta Five Elements", artist: "Veerappan Naidu", region: "Mahabalipuram, TN", price: 6500, original: 8000, rating: 4.6, reviews: 11, img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=500", badge: null, size: "10 inch height", medium: "Granite stone", delivery: "8-12 days" },
    { id: "hcs6", title: "Buddha Serenity Face", artist: "Hem Raj Gurung", region: "Darjeeling, WB", price: 4200, original: null, rating: 4.5, reviews: 9, img: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=80&w=500", badge: "New", size: "8 inch height", medium: "Clay terracotta glazed", delivery: "4-7 days" },
  ],
  "Clay pottery": [
    { id: "cp1", title: "Bankura Horse Pair", artist: "Kartik Pal", region: "Bankura, WB", price: 2800, original: 3500, rating: 4.9, reviews: 34, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Bankura_Horse.jpg/600px-Bankura_Horse.jpg", badge: "GI Tagged", size: "10 inch height", medium: "Terracotta unglazed", delivery: "4-6 days" },
    { id: "cp2", title: "Jaipur Blue Pottery Vase", artist: "Salim Khan", region: "Jaipur, Rajasthan", price: 1600, original: 2000, rating: 4.8, reviews: 27, img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500", badge: "Bestseller", size: "9 inch height", medium: "Blue pottery Persian glaze", delivery: "3-5 days" },
    { id: "cp3", title: "Terracotta Diya Set of 10", artist: "Kanta Devi", region: "Molela, Rajasthan", price: 350, original: 450, rating: 4.5, reviews: 48, img: "https://images.unsplash.com/photo-1604503468506-a8da13d11c56?q=80&w=500", badge: "Festive Pick", size: "3 inch diameter", medium: "Terracotta hand-pinched", delivery: "2-3 days" },
    { id: "cp4", title: "Molela Votive Plaque Goddess", artist: "Nathu Lal Kumhar", region: "Molela, Rajasthan", price: 1200, original: 1500, rating: 4.7, reviews: 16, img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=500", badge: "GI Tagged", size: "14x10 inch", medium: "Terracotta relief natural colour", delivery: "4-6 days" },
    { id: "cp5", title: "Black Pottery Water Pot Nizamabad", artist: "Ahmed Khan", region: "Nizamabad, Telangana", price: 2200, original: 2800, rating: 4.6, reviews: 12, img: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=500", badge: "Rare Craft", size: "11 inch height", medium: "Black clay lacquer finish", delivery: "5-7 days" },
    { id: "cp6", title: "Kutch Clay Wall Panel", artist: "Fatima Harijan", region: "Kutch, Gujarat", price: 4500, original: 5500, rating: 4.8, reviews: 19, img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=500", badge: "Featured", size: "18x14 inch panel", medium: "Clay relief natural pigment", delivery: "6-9 days" },
  ],
  "Hand embroidery": [
    { id: "he1", title: "Kutch Shisha Embroidered Cushion", artist: "Hamida Harijan", region: "Kutch, Gujarat", price: 1800, original: 2300, rating: 4.9, reviews: 31, img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=500", badge: "GI Tagged", size: "16x16 inch", medium: "Mirror work cotton thread", delivery: "4-6 days" },
    { id: "he2", title: "Chikankari Kurta White on White", artist: "Shaheen Bano", region: "Lucknow, UP", price: 3200, original: 4000, rating: 4.8, reviews: 22, img: "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=500", badge: "Bestseller", size: "S M L XL", medium: "Chikankari on muslin", delivery: "5-7 days" },
    { id: "he3", title: "Phulkari Dupatta Punjab", artist: "Gurpreet Kaur", region: "Patiala, Punjab", price: 2600, original: 3200, rating: 4.7, reviews: 18, img: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=500", badge: "Top Rated", size: "2.5m x 1m", medium: "Phulkari silk floss on khaddar", delivery: "4-6 days" },
    { id: "he4", title: "Kashmiri Sozni Pashmina Shawl", artist: "Farooq Ahmad Wani", region: "Srinagar, Kashmir", price: 12000, original: 16000, rating: 5.0, reviews: 48, img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?q=80&w=500", badge: "Award Winner", size: "2m x 1m", medium: "Sozni embroidery on pashmina", delivery: "8-12 days" },
    { id: "he5", title: "Kantha Quilt Bengali", artist: "Anjali Biswas", region: "Murshidabad, WB", price: 4500, original: 5500, rating: 4.8, reviews: 26, img: "https://images.unsplash.com/photo-1578301978693-1ab5c88e5e01?q=80&w=500", badge: "GI Tagged", size: "60x48 inch", medium: "Kantha running stitch on cotton", delivery: "6-9 days" },
    { id: "he6", title: "Banjara Tribal Bag", artist: "Shanthi Banjara", region: "Nizamabad, Telangana", price: 950, original: 1200, rating: 4.4, reviews: 11, img: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=500", badge: null, size: "10x8 inch", medium: "Mirror and bead embroidery", delivery: "3-5 days" },
  ],
  "Handloom weaving": [
    { id: "hl1", title: "Sambalpuri Ikat Saree Bandha", artist: "Sushant Meher", region: "Sambalpur, Odisha", price: 8500, original: 11000, rating: 5.0, reviews: 52, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500", badge: "GI Tagged", size: "5.5m x 1.2m", medium: "Ikat weave cotton silk", delivery: "7-10 days" },
    { id: "hl2", title: "Banarasi Brocade Dupatta", artist: "Irfan Ali Ansari", region: "Varanasi, UP", price: 4200, original: 5500, rating: 4.9, reviews: 38, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=500", badge: "Bestseller", size: "2.5m x 0.6m", medium: "Zari brocade on pure silk", delivery: "5-8 days" },
    { id: "hl3", title: "Assam Muga Silk Stole", artist: "Dipali Saikia", region: "Sualkuchi, Assam", price: 3800, original: 4800, rating: 4.8, reviews: 21, img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=500", badge: "GI Tagged", size: "2m x 0.5m", medium: "Muga silk hand loom", delivery: "5-7 days" },
    { id: "hl4", title: "Kanjivaram Table Runner", artist: "Chellamal Murugan", region: "Kanchipuram, TN", price: 2200, original: 2800, rating: 4.7, reviews: 16, img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?q=80&w=500", badge: "Featured", size: "2m x 0.35m", medium: "Zari and silk thread handloom", delivery: "4-6 days" },
    { id: "hl5", title: "Pochampally Ikat Kurta Fabric", artist: "Lakshmi Devamma", region: "Pochampally, Telangana", price: 1800, original: 2300, rating: 4.6, reviews: 13, img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4457?q=80&w=500", badge: "GI Tagged", size: "2.5m x 1.1m", medium: "Ikat cotton handloom", delivery: "4-6 days" },
    { id: "hl6", title: "Patan Patola Silk Saree", artist: "Rohit Salvi", region: "Patan, Gujarat", price: 28000, original: 36000, rating: 5.0, reviews: 61, img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=500", badge: "Heirloom Piece", size: "5.5m x 1.2m", medium: "Double ikat pure silk", delivery: "14-21 days" },
  ],
  "Madhubani painting": [
    { id: "mp1", title: "Radha-Krishna Kohbar", artist: "Sita Devi", region: "Madhubani, Bihar", price: 4500, original: 5500, rating: 5.0, reviews: 58, img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Radha_and_Krishna_by_DHURANDHAR_MV.jpg", badge: "GI Tagged", size: "24x18 inch", medium: "Natural pigment on handmade paper", delivery: "5-8 days" },
    { id: "mp2", title: "Mithila Fish and Lotus Motif", artist: "Chandrakala Devi", region: "Darbhanga, Bihar", price: 1800, original: 2300, rating: 4.8, reviews: 29, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Madhubani_painting.jpg/800px-Madhubani_painting.jpg", badge: "Bestseller", size: "15x12 inch", medium: "Watercolour and ink Mithila style", delivery: "4-6 days" },
    { id: "mp3", title: "Wedding Procession Panorama", artist: "Urmila Devi", region: "Madhubani, Bihar", price: 6500, original: 8000, rating: 4.9, reviews: 37, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Madhubani_Art.jpg/800px-Madhubani_Art.jpg", badge: "Award Winner", size: "36x18 inch", medium: "Natural dye bamboo twig", delivery: "7-10 days" },
    { id: "mp4", title: "Durga Puja Scene", artist: "Reeta Devi", region: "Sitamarhi, Bihar", price: 2800, original: 3500, rating: 4.7, reviews: 19, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Durga_by_Raja_Ravi_Varma.jpg/600px-Durga_by_Raja_Ravi_Varma.jpg", badge: null, size: "18x14 inch", medium: "Mineral pigment on paper", delivery: "4-6 days" },
    { id: "mp5", title: "Madhubani Painted Silk Saree", artist: "Bina Devi", region: "Madhubani, Bihar", price: 9500, original: 12000, rating: 4.9, reviews: 33, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=500", badge: "Featured", size: "5.5m saree", medium: "Hand-painted on silk", delivery: "8-12 days" },
    { id: "mp6", title: "Greeting Cards Set of 8", artist: "Nilofar Khatun", region: "Madhubani, Bihar", price: 350, original: 450, rating: 4.5, reviews: 14, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Madhubani_painting.jpg/400px-Madhubani_painting.jpg", badge: "New", size: "4x6 inch each", medium: "Madhubani print on paper", delivery: "2-3 days" },
  ],
  "Warli art": [
    { id: "wa1", title: "Tarpa Dance Festival Night", artist: "Jivya Soma Mashe", region: "Dahanu, Maharashtra", price: 3500, original: 4500, rating: 5.0, reviews: 47, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Warli_painting.jpg/800px-Warli_painting.jpg", badge: "Top Rated", size: "24x18 inch", medium: "Rice paste on mud cloth", delivery: "5-8 days" },
    { id: "wa2", title: "Wedding Ceremony Scene", artist: "Balu Mashe", region: "Palghar, Maharashtra", price: 1800, original: 2200, rating: 4.8, reviews: 22, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warli-Painting.jpg/800px-Warli-Painting.jpg", badge: "Bestseller", size: "18x14 inch", medium: "Acrylic on black canvas", delivery: "4-6 days" },
    { id: "wa3", title: "Warli Print Tote Bag", artist: "Radha Mashe", region: "Palghar, Maharashtra", price: 650, original: 850, rating: 4.6, reviews: 31, img: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=500", badge: "Popular", size: "14x12 inch bag", medium: "Screen-printed on canvas", delivery: "2-3 days" },
    { id: "wa4", title: "Sacred Grove Ancestors", artist: "Lata Warli", region: "Vikramgad, Maharashtra", price: 2600, original: 3200, rating: 4.7, reviews: 15, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Warli_painting.jpg/600px-Warli_painting.jpg", badge: null, size: "20x15 inch", medium: "White on terracotta board", delivery: "4-6 days" },
    { id: "wa5", title: "Wall Mural Kit DIY Warli", artist: "Warli Artisan Collective", region: "Palghar, Maharashtra", price: 1200, original: 1500, rating: 4.5, reviews: 19, img: "https://images.unsplash.com/photo-1581574919402-5b7d733224d6?q=80&w=500", badge: "New", size: "Covers 3x4 ft wall", medium: "Stencil and pigment kit", delivery: "3-4 days" },
    { id: "wa6", title: "Warli Cushion Cover Pair", artist: "Sunita Warli", region: "Dahanu, Maharashtra", price: 900, original: 1200, rating: 4.4, reviews: 12, img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=500", badge: null, size: "16x16 inch each", medium: "Block print on cotton", delivery: "2-4 days" },
  ],
  "Gond art": [
    { id: "ga1", title: "Tiger King of the Forest", artist: "Bhajju Shyam", region: "Bhopal, MP", price: 8500, original: 11000, rating: 5.0, reviews: 63, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gond_painting_by_Bhajju_Shyam.jpg/800px-Gond_painting_by_Bhajju_Shyam.jpg", badge: "Award Winner", size: "30x24 inch", medium: "Acrylic on canvas jangarh style", delivery: "7-10 days" },
    { id: "ga2", title: "Tree of Life Gond", artist: "Durga Bai Vyam", region: "Dindori, MP", price: 5500, original: 7000, rating: 4.9, reviews: 41, img: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=500", badge: "Featured", size: "24x18 inch", medium: "Acrylic on canvas", delivery: "6-8 days" },
    { id: "ga3", title: "Gond Peacock Vibrant Panel", artist: "Nankushiya Shyam", region: "Patangarh, MP", price: 3200, original: 4000, rating: 4.8, reviews: 28, img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500", badge: "Bestseller", size: "20x16 inch", medium: "Acrylic on black canvas", delivery: "5-7 days" },
    { id: "ga4", title: "Gond Diary Hand Painted Cover", artist: "Venkat Shyam", region: "Bhopal, MP", price: 850, original: 1100, rating: 4.6, reviews: 17, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500", badge: null, size: "A5 diary", medium: "Gond painted leather cover", delivery: "3-5 days" },
    { id: "ga5", title: "Forest Spirits Triptych", artist: "Raju Nayak", region: "Mandla, MP", price: 12000, original: 15000, rating: 4.9, reviews: 24, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gond_painting_by_Bhajju_Shyam.jpg/600px-Gond_painting_by_Bhajju_Shyam.jpg", badge: "Collectors Choice", size: "3 panels 14x20 inch", medium: "Acrylic triptych on canvas", delivery: "10-14 days" },
    { id: "ga6", title: "Gond Fish Printed Fabric", artist: "Subhash Vyam", region: "Bhopal, MP", price: 1400, original: null, rating: 4.5, reviews: 11, img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4457?q=80&w=500", badge: "New", size: "1m x 1m fabric", medium: "Screen-print on cotton", delivery: "3-4 days" },
  ],
};


const BADGE_COLORS = {
  "Bestseller": { bg: "#b45309", color: "#fff" }, "Top Rated": { bg: "#7c3aed", color: "#fff" }, "Featured": { bg: "#0369a1", color: "#fff" },
  "Award Winner": { bg: "#9f1239", color: "#fff" }, "New": { bg: "#15803d", color: "#fff" }, "GI Tagged": { bg: "#2f6f4f", color: "#fff" },
  "Popular": { bg: "#b45309", color: "#fff" }, "Rare Craft": { bg: "#6d28d9", color: "#fff" }, "Festive Pick": { bg: "#b45309", color: "#fff" },
  "Heirloom Piece": { bg: "#9f1239", color: "#fff" }, "Collectors Choice": { bg: "#6d28d9", color: "#fff" },
  "Tribal Art": { bg: "#064e3b", color: "#fff" },
};

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    React.createElement("span", { style: { color: "#f59e0b", fontSize: 12 } },
      "\u2605".repeat(full) + (half ? "\u00bd" : "") + "\u2606".repeat(5 - full - (half ? 1 : 0))
    )
  );
}

function OrderForm({ product, isHi, onClose, onSuccess }) {
  const [form, setForm] = React.useState({ name: "", phone: "+91 ", address: "", pincode: "", qty: 1 });
  const [placed, setPlaced] = React.useState(false);
  const shipping = 150;
  const total = product.price * form.qty + shipping;
  const orderId = "HB-" + String(Date.now()).slice(-6);
  const inp = { width: "100%", border: "1.5px solid #d6cfc7", borderRadius: 8, padding: "9px 12px", fontSize: 13, background: "#fff", outline: "none", boxSizing: "border-box", marginTop: 4 };
  const lbl = { fontSize: 12, fontWeight: 600, color: "#6b5c50", marginTop: 12, display: "block" };
  const h = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  if (placed) return (
    React.createElement("div", { style: { textAlign: "center", padding: "20px 0" } },
      React.createElement("div", { style: { fontSize: 48, marginBottom: 12 } }, "\u2705"),
      React.createElement("h3", { style: { margin: "0 0 6px", color: "#15803d", fontSize: 20 } }, isHi ? "\u0911\u0930\u094d\u0921\u0930 \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u0926\u0930\u094d\u091c \u0939\u094b \u0917\u092f\u093e!" : "Order Placed Successfully!"),
      React.createElement("p", { style: { margin: "0 0 16px", fontSize: 13, color: "#6b5c50" } }, isHi ? `\u0911\u0930\u094d\u0921\u0930 \u0928\u0902\u092c\u0930: #${orderId}` : `Order ID: #${orderId}`),
      React.createElement("div", { style: { background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "14px 18px", textAlign: "left", marginBottom: 20 } },
        React.createElement("p", { style: { margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "#1c1917" } }, product.title),
        React.createElement("p", { style: { margin: "0 0 4px", fontSize: 12, color: "#6b7280" } }, (isHi ? "\u0915\u093e\u0930\u0940\u0917\u0930: " : "Artisan: ") + product.artist),
        React.createElement("p", { style: { margin: "0 0 4px", fontSize: 12, color: "#6b7280" } }, (isHi ? "\u092e\u093e\u0924\u094d\u0930\u093e: " : "Qty: ") + form.qty + " | " + (isHi ? "\u0915\u0941\u0932: " : "Total: ") + "\u20b9" + total.toLocaleString("en-IN")),
        React.createElement("p", { style: { margin: 0, fontSize: 12, color: "#6b7280" } }, (isHi ? "\u0921\u093f\u0932\u0940\u0935\u0930\u0940: " : "Delivery: ") + product.delivery)
      ),
      React.createElement("button", { onClick: onSuccess, style: { width: "100%", background: "#2b251e", color: "#d8c48c", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer" } }, isHi ? "\u2713 \u0920\u0940\u0915 \u0939\u0948" : "\u2713 Done")
    )
  );
  const valid = form.name && form.phone.length > 5 && form.address && form.pincode.length === 6;
  return (
    React.createElement("div", null,
      React.createElement("h3", { style: { margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1c1917" } }, isHi ? "\u0911\u0930\u094d\u0921\u0930 \u0915\u0930\u0947\u0902" : "Place Order"),
      React.createElement("p", { style: { margin: "0 0 14px", fontSize: 12, color: "#6b7280" } }, "\uD83D\uDCE6 " + product.title),
      React.createElement("label", { style: lbl }, isHi ? "\u092a\u0942\u0930\u093e \u0928\u093e\u092e*" : "Full Name*"),
      React.createElement("input", { style: inp, value: form.name, onChange: h("name"), placeholder: isHi ? "\u0906\u092a\u0915\u093e \u0928\u093e\u092e" : "Your full name" }),
      React.createElement("label", { style: lbl }, isHi ? "\u092e\u094b\u092c\u093e\u0907\u0932*" : "Mobile*"),
      React.createElement("input", { style: inp, value: form.phone, onChange: h("phone"), placeholder: "+91 98765 43210" }),
      React.createElement("label", { style: lbl }, isHi ? "\u0921\u093f\u0932\u0940\u0935\u0930\u0940 \u092a\u0924\u093e*" : "Address*"),
      React.createElement("textarea", { style: { ...inp, resize: "vertical", minHeight: 64 }, value: form.address, onChange: h("address"), placeholder: isHi ? "\u092a\u0942\u0930\u093e \u092a\u0924\u093e, \u091c\u093f\u0932\u093e, \u0930\u093e\u091c\u094d\u092f" : "Full address, district, state" }),
      React.createElement("label", { style: lbl }, isHi ? "\u092a\u093f\u0928\u0915\u094b\u0921*" : "Pincode*"),
      React.createElement("input", { style: inp, value: form.pincode, onChange: h("pincode"), placeholder: "110001", maxLength: 6 }),
      React.createElement("label", { style: lbl }, isHi ? "\u092e\u093e\u0924\u094d\u0930\u093e" : "Quantity"),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 4 } },
        React.createElement("button", { onClick: () => setForm(f => ({ ...f, qty: Math.max(1, f.qty - 1) })), style: { width: 32, height: 32, border: "1.5px solid #d6cfc7", borderRadius: 6, background: "#fff", fontSize: 18, cursor: "pointer" } }, "\u2212"),
        React.createElement("span", { style: { fontWeight: 700, fontSize: 15 } }, form.qty),
        React.createElement("button", { onClick: () => setForm(f => ({ ...f, qty: f.qty + 1 })), style: { width: 32, height: 32, border: "1.5px solid #d6cfc7", borderRadius: 6, background: "#fff", fontSize: 18, cursor: "pointer" } }, "+")
      ),
      React.createElement("div", { style: { background: "#f9f5ef", borderRadius: 10, padding: "12px 14px", marginTop: 16 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 } },
          React.createElement("span", { style: { color: "#6b5c50" } }, "\u20b9" + product.price.toLocaleString("en-IN") + " x " + form.qty),
          React.createElement("span", null, "\u20b9" + (product.price * form.qty).toLocaleString("en-IN"))
        ),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 } },
          React.createElement("span", { style: { color: "#6b5c50" } }, isHi ? "\u0936\u093f\u092a\u093f\u0902\u0917" : "Shipping"),
          React.createElement("span", null, "\u20b9150")
        ),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, borderTop: "1px solid #e5dcd2", paddingTop: 8 } },
          React.createElement("span", null, isHi ? "\u0915\u0941\u0932" : "Total"),
          React.createElement("span", { style: { color: "#2f6f4f" } }, "\u20b9" + total.toLocaleString("en-IN"))
        )
      ),
      React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 16 } },
        React.createElement("button", { onClick: onClose, style: { flex: 1, background: "#f0ebe3", color: "#6b5c50", border: "none", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer" } }, isHi ? "\u0930\u0926\u094d\u0926" : "Cancel"),
        React.createElement("button", { disabled: !valid, onClick: () => setPlaced(true), style: { flex: 2, background: valid ? "linear-gradient(135deg,#2b251e,#4a3728)" : "#ccc", color: valid ? "#d8c48c" : "#888", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed" } }, isHi ? "\u2713 \u0911\u0930\u094d\u0921\u0930 \u0915\u0930\u0947\u0902" : "\u2713 Confirm Order")
      )
    )
  );
}

function CategoryBrowseModal({ category, isHi, onClose }) {
  const products = CATEGORY_PRODUCTS[category] || [];
  const [cart, setCart] = React.useState([]);
  const [orderProduct, setOrderProduct] = React.useState(null);
  const [cartNotice, setCartNotice] = React.useState(null);
  const [sort, setSort] = React.useState("popular");

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const addToCart = (id) => {
    setCart(c => c.includes(id) ? c : [...c, id]);
    setCartNotice(id);
    setTimeout(() => setCartNotice(null), 2000);
  };

  const el = React.createElement;

  const card = (product) => {
    const inCart = cart.includes(product.id);
    const justAdded = cartNotice === product.id;
    const bc = BADGE_COLORS[product.badge] || { bg: "#6b7280", color: "#fff" };
    const disc = product.original ? Math.round((1 - product.price / product.original) * 100) : null;
    return el("div", {
      key: product.id,
      style: { background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", border: inCart ? "2px solid #b45309" : "2px solid transparent", transition: "transform 0.2s,box-shadow 0.2s", cursor: "default" },
      onMouseEnter: (e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)"; },
      onMouseLeave: (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)"; },
    },
      el("div", { style: { position: "relative", overflow: "hidden", height: 180 } },
        el("img", { src: product.img, alt: product.title, style: { width: "100%", height: "100%", objectFit: "cover" }, loading: "lazy" }),
        product.badge && el("span", { style: { position: "absolute", top: 10, left: 10, background: bc.bg, color: bc.color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5 } }, product.badge),
        justAdded && el("div", { style: { position: "absolute", inset: 0, background: "rgba(180,83,9,0.85)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" } }, "\u2713 " + (isHi ? "\u0915\u093e\u0930\u094d\u091f \u092e\u0947\u0902 \u091c\u094b\u0921\u093c\u093e!" : "Added to Cart!"))
      ),
      el("div", { style: { padding: "14px 14px 0", flex: 1 } },
        el("h4", { style: { margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#1c1917", lineHeight: 1.3 } }, product.title),
        el("p", { style: { margin: "0 0 6px", fontSize: 11, color: "#8b7355" } }, "\uD83D\uDC64 " + product.artist + " \u00b7 \uD83D\uDCCD " + product.region),
        el("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 } },
          el(Stars, { rating: product.rating }),
          el("span", { style: { fontSize: 11, color: "#9ca3af" } }, "(" + product.reviews + ")")
        ),
        el("p", { style: { margin: "0 0 4px", fontSize: 11, color: "#6b7280" } }, "\uD83D\uDCD0 " + product.size + " \u00b7 \uD83C\uDFA8 " + product.medium),
        el("p", { style: { margin: "0 0 10px", fontSize: 11, color: "#6b7280" } }, "\uD83D\uDE9A " + (isHi ? "\u0921\u093f\u0932\u0940\u0935\u0930\u0940: " : "Delivery: ") + product.delivery)
      ),
      el("div", { style: { padding: "10px 14px 14px", borderTop: "1px solid #f0ebe3" } },
        el("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 } },
          el("span", { style: { fontSize: 18, fontWeight: 800, color: "#1c1917" } }, "\u20b9" + product.price.toLocaleString("en-IN")),
          product.original && el("span", { style: { fontSize: 12, color: "#9ca3af", textDecoration: "line-through" } }, "\u20b9" + product.original.toLocaleString("en-IN")),
          disc && el("span", { style: { fontSize: 11, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 4, fontWeight: 700 } }, disc + "% OFF")
        ),
        el("div", { style: { display: "flex", gap: 8 } },
          el("button", { onClick: () => addToCart(product.id), style: { flex: 1, border: "2px solid " + (inCart ? "#b45309" : "#d6cfc7"), background: inCart ? "#fff8f0" : "#fff", color: inCart ? "#b45309" : "#6b5c50", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, inCart ? "\u2713 Cart" : "\uD83D\uDED2"),
          el("button", { onClick: () => setOrderProduct(product), style: { flex: 2, background: "linear-gradient(135deg,#2b251e,#4a3728)", color: "#d8c48c", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, isHi ? "\u25B6 \u0911\u0930\u094d\u0921\u0930 \u0915\u0930\u0947\u0902" : "\u25B6 Order Now")
        )
      )
    );
  };

  return createPortal(
    el("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 10000, background: "rgba(15,12,10,0.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 16px", overflowY: "auto" } },
      el("div", { onClick: (e) => e.stopPropagation(), style: { background: "#faf7f2", borderRadius: 20, width: "100%", maxWidth: 920, boxShadow: "0 32px 80px rgba(0,0,0,0.35)", overflow: "hidden", marginBottom: 24 } },
        el("div", { style: { background: "linear-gradient(135deg,#1c1917 0%,#3d2f22 100%)", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 } },
          el("div", null,
            el("h2", { style: { margin: 0, color: "#f5f0e8", fontSize: 20, fontWeight: 800 } }, "\uD83D\uDED2 " + category + (isHi ? " \u2014 \u0932\u093f\u0938\u094d\u091f\u093f\u0902\u0917" : " \u2014 Browse Listings")),
            el("p", { style: { margin: "4px 0 0", color: "#a89882", fontSize: 13 } },
              products.length + (isHi ? " \u0909\u0924\u094d\u092a\u093e\u0926 \u0909\u092a\u0932\u092c\u094d\u0927" : " handcrafted pieces"),
              cart.length > 0 && el("span", { style: { marginLeft: 16, background: "#b45309", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 } }, "\uD83D\uDED2 " + cart.length + (isHi ? " \u0915\u093e\u0930\u094d\u091f \u092e\u0947\u0902" : " in cart"))
            )
          ),
          el("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
            el("select", { value: sort, onChange: (e) => setSort(e.target.value), style: { background: "rgba(255,255,255,0.1)", color: "#f5f0e8", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer" } },
              el("option", { value: "popular", style: { color: "#000" } }, isHi ? "\u0932\u094b\u0915\u092a\u094d\u0930\u093f\u092f" : "Popular"),
              el("option", { value: "rating", style: { color: "#000" } }, isHi ? "\u0930\u0947\u091f\u093f\u0902\u0917" : "Top Rated"),
              el("option", { value: "price-asc", style: { color: "#000" } }, isHi ? "\u0915\u092e \u0915\u0940\u092e\u0924" : "Price: Low"),
              el("option", { value: "price-desc", style: { color: "#000" } }, isHi ? "\u091c\u093c\u094d\u092f\u093e\u0926\u093e \u0915\u0940\u092e\u0924" : "Price: High")
            ),
            el("button", { onClick: onClose, style: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#f5f0e8", width: 36, height: 36, fontSize: 20, cursor: "pointer", lineHeight: 1 } }, "\u00d7")
          )
        ),
        el("div", { style: { padding: "24px 24px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20 } },
          sorted.map(card)
        ),
        el("div", { style: { background: "linear-gradient(135deg,#1c1917,#3d2f22)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" } },
          el("p", { style: { margin: 0, color: "#d8c48c", fontSize: 13 } }, isHi ? "\uD83E\uDD1D \u092F\u0947 \u0938\u092D\u0940 \u0909\u0924\u094D\u092A\u093E\u0926 \u092A\u094D\u0930\u092E\u093E\u0923\u093F\u0924 \u092D\u093E\u0930\u0924\u0940\u092F \u0915\u093E\u0930\u0940\u0917\u0930\u094B\u0902 \u0926\u094D\u0935\u093E\u0930\u093E \u0938\u0940\u0927\u0947 \u092C\u0928\u093E\u090F \u0917\u090F \u0939\u0948\u0902\u0964" : "\uD83E\uDD1D All pieces are handmade by certified Indian artisans. Your purchase supports a family."),
          el("span", { style: { color: "#a89882", fontSize: 12, whiteSpace: "nowrap" } }, "\uD83D\uDCDE +91 6207443800")
        )
      ),
      orderProduct && el("div", { onClick: () => setOrderProduct(null), style: { position: "fixed", inset: 0, zIndex: 10001, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } },
        el("div", { onClick: (e) => e.stopPropagation(), style: { background: "#faf7f2", borderRadius: 18, maxWidth: 440, width: "100%", maxHeight: "92vh", overflowY: "auto", padding: "24px 24px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" } },
          el(OrderForm, { product: orderProduct, isHi, onClose: () => setOrderProduct(null), onSuccess: () => setOrderProduct(null) })
        )
      )
    ),
    document.body
  );
}

export default CategoryBrowseModal;