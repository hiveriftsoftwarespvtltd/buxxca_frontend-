import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useToast } from '../context/ToastContext';
import Swal from 'sweetalert2';
import { formatPrice, getImageUrl } from '../constants/storeData';
import { 
  LayoutDashboard, 
  Briefcase, 
  ShoppingBag, 
  Users, 
  Tag, 
  Building2, 
  Ticket, 
  LogOut, 
  Search, 
  IndianRupee, 
  Clock, 
  AlertTriangle, 
  Pencil, 
  Trash2, 
  Star, 
  Plus, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Calendar,
  Backpack,
  Laptop,
  Compass,
  Copy,
  Folder,
  Gift,
  Sparkles
} from 'lucide-react';

const categoryIconMap = {
  'backpacks': Backpack,
  'laptop-bags': Laptop,
  'travel-bags': Briefcase,
  'sling-bags': Compass,
  'corporate-gifting': Gift,
  'organizers': Folder,
  'gym-sports': ShoppingBag,
  'premium-collection': Sparkles,
};

export default function Admin() {
  const ITEMS_PER_PAGE = 8;
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('buxaa-admin-active-tab') || 'dashboard';
  });
  const { showToast } = useToast();
  const navigate = useNavigate();

  // API datasets
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // Coupon management states
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponModalMode, setCouponModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [coupCode, setCoupCode] = useState('');
  const [coupType, setCoupType] = useState('fixed');
  const [coupValue, setCoupValue] = useState('');
  const [coupMinSubtotal, setCoupMinSubtotal] = useState('0');
  const [coupDesc, setCoupDesc] = useState('');
  const [coupIsActive, setCoupIsActive] = useState(true);
  const [coupExpiryDate, setCoupExpiryDate] = useState('');
  const [coupUsageLimit, setCoupUsageLimit] = useState('');
  const [coupMaxDiscount, setCoupMaxDiscount] = useState('');

  const [couponSearch, setCouponSearch] = useState('');
  const [couponStatusFilter, setCouponStatusFilter] = useState('all');
  const [couponTypeFilter, setCouponTypeFilter] = useState('all');
  const [couponPage, setCouponPage] = useState(1);

  // Reset coupon page numbers on filter changes
  useEffect(() => { setCouponPage(1); }, [couponSearch, couponStatusFilter, couponTypeFilter]);

  // Sidebar state — collapsed on desktop, closed (drawer) on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');
  
  // Top Products Tab States
  const [topProductsSearch, setTopProductsSearch] = useState('');
  const [topProductsCatFilter, setTopProductsCatFilter] = useState('');
  const [topProductsAddPage, setTopProductsAddPage] = useState(1);

  useEffect(() => {
    setTopProductsAddPage(1);
  }, [topProductsSearch, topProductsCatFilter]);

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingProduct, setEditingProduct] = useState(null);

  // Form Fields
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('backpacks');
  const [prodGender, setProdGender] = useState('Laptop Backpacks');
  const [prodStock, setProdStock] = useState('50');
  const [prodScentFamily, setProdScentFamily] = useState('Polyester');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodStatus, setProdStatus] = useState('active');
  const [prodImg, setProdImg] = useState('');
  const [prodTopNotes, setProdTopNotes] = useState('Ballistic Polyester');
  const [prodHeartNotes, setProdHeartNotes] = useState('32 Liters Capacity');
  const [prodBaseNotes, setProdBaseNotes] = useState('YKK Zippers, Laptop Compartment');
  const [prodIsBestseller, setProdIsBestseller] = useState(false);
  const [prodIsNew, setProdIsNew] = useState(true);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Pagination States
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [customerPage, setCustomerPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [revenuePeriod, setRevenuePeriod] = useState('6M');

  // Reset page numbers on filter changes
  useEffect(() => { setProductPage(1); }, [productSearch, selectedCategoryFilter]);
  useEffect(() => { setOrderPage(1); }, [orderFilter]);

  const renderPagination = (currentPage, totalPages, setPage) => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #EAEAEA' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="btn btn-outline btn-sm"
          style={{ padding: '4px 10px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          &larr; Prev
        </button>
        {pages.map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '2px',
              border: p === currentPage ? 'none' : '1px solid #EAEAEA',
              background: p === currentPage ? '#D4A23A' : 'transparent',
              color: p === currentPage ? '#FFFFFF' : '#0A234D',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className="btn btn-outline btn-sm"
          style={{ padding: '4px 10px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          Next &rarr;
        </button>
      </div>
    );
  };

  // Category Form & Modal States
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [catModalMode, setCatModalMode] = useState('add');
  const [editingCategory, setEditingCategory] = useState(null);
  const [catName, setCatName] = useState('');
  const [catEmoji, setCatEmoji] = useState('🎒');
  const [catImg, setCatImg] = useState('');
  const [catSubItems, setCatSubItems] = useState('');
  const [catEnabled, setCatEnabled] = useState(true);

  // Dynamic Subcategory Syncer
  useEffect(() => {
    if (prodCategory && categories.length > 0) {
      const cat = categories.find(c => c.slug === prodCategory);
      if (cat && cat.subItems && cat.subItems.length > 0) {
        if (!cat.subItems.includes(prodGender)) {
          setProdGender(cat.subItems[0]);
        }
      }
    }
  }, [prodCategory, categories, prodGender]);

  // Close mobile sidebar on tab change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  // Close mobile sidebar on window resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsSidebarOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ Image must be less than 5MB', '✨');
      return;
    }
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64: base64String })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setProdImg(data.path);
          showToast('📸 Image uploaded successfully!', '✨');
        } else {
          showToast('❌ Image upload failed: ' + (data.message || ''), '✨');
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to process image', '✨');
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('buxaa-admin-active-tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const token = localStorage.getItem('buxaa-admin-token');
    if (token) {
      setAuthorized(true);
    } else {
      showToast('⚠️ Access Denied. Admin sign-in required.', '✨');
      navigate('/admin-login');
    }
  }, [navigate, showToast]);

  const fetchAllData = async () => {
    try {
      const prodRes = await fetch('/api/products?t=' + Date.now());
      if (prodRes.ok) setProducts(await prodRes.json());
      const ordRes = await fetch('/api/orders?t=' + Date.now());
      if (ordRes.ok) setOrders(await ordRes.json());
      const custRes = await fetch('/api/customers?t=' + Date.now());
      if (custRes.ok) setCustomers(await custRes.json());
      const catRes = await fetch('/api/categories?t=' + Date.now());
      if (catRes.ok) setCategories(await catRes.json());
      const brandRes = await fetch('/api/brands?t=' + Date.now());
      if (brandRes.ok) setBrands(await brandRes.json());
      const coupRes = await fetch('/api/coupons?t=' + Date.now());
      if (coupRes.ok) setCoupons(await coupRes.json());
    } catch (err) {
      console.error('Admin loader error:', err);
    }
  };

  useEffect(() => {
    if (authorized) fetchAllData();
  }, [authorized]);

  const handleLogout = () => {
    localStorage.removeItem('buxaa-admin-token');
    showToast('🚪 Signed out successfully.', '✨');
    navigate('/admin-login');
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) {
      showToast('⚠️ Product name and price are required.', '✨');
      return;
    }
    const payload = {
      name: prodName,
      price: Number(prodPrice),
      originalPrice: prodOriginalPrice ? Number(prodOriginalPrice) : null,
      category: prodCategory,
      stock: Number(prodStock),
      scentFamily: prodScentFamily,
      gender: prodGender,
      concentration: prodHeartNotes || 'One Size',
      subtitle: prodSubtitle,
      description: prodDescription || `<p>Experience ${prodName}, a premium bag from BUXAA.</p>`,
      status: prodStatus,
      isBestseller: prodIsBestseller,
      isNewArrival: prodIsNew,
      isFeatured: prodIsFeatured,
      img: prodImg || 'https://images.unsplash.com/photo-1575916140120-bfa5c3f1f6c0?w=500&auto=format&fit=crop&q=80',
      imgs: [prodImg || 'https://images.unsplash.com/photo-1575916140120-bfa5c3f1f6c0?w=500&auto=format&fit=crop&q=80'],
      notes: {
        top: prodTopNotes ? prodTopNotes.split(',').map(s => s.trim()).filter(Boolean) : [],
        heart: prodHeartNotes ? prodHeartNotes.split(',').map(s => s.trim()).filter(Boolean) : [],
        base: prodBaseNotes ? prodBaseNotes.split(',').map(s => s.trim()).filter(Boolean) : []
      }
    };
    try {
      let endpoint = '/api/products/add';
      if (modalMode === 'edit' && editingProduct) {
        endpoint = '/api/products/update';
        payload.id = editingProduct.id;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(`🎉 Product ${modalMode === 'add' ? 'added' : 'updated'} successfully!`, '✨');
        fetchAllData();
        setShowProductModal(false);
        resetForm();
      } else {
        showToast('❌ Server error during product operation.', '✨');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', '✨');
    }
  };

  const handleEditClick = (p) => {
    setModalMode('edit');
    setEditingProduct(p);
    setProdName(p.name);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || '');
    setProdCategory(p.category);
    setProdStock(p.stock);
    setProdScentFamily(p.scentFamily);
    setProdGender(p.gender || '');
    setProdSubtitle(p.subtitle || '');
    setProdDescription(p.description || '');
    setProdStatus(p.status || 'active');
    setProdImg(p.img || '');
    setProdIsBestseller(p.isBestseller || false);
    setProdIsNew(p.isNewArrival !== undefined ? p.isNewArrival : (p.isNew !== undefined ? p.isNew : true));
    setProdIsFeatured(p.isFeatured || false);
    if (p.notes) {
      setProdTopNotes(Array.isArray(p.notes.top) ? p.notes.top.join(', ') : (p.notes.top || ''));
      setProdHeartNotes(Array.isArray(p.notes.heart) ? p.notes.heart.join(', ') : (p.notes.heart || ''));
      setProdBaseNotes(Array.isArray(p.notes.base) ? p.notes.base.join(', ') : (p.notes.base || ''));
    } else {
      setProdTopNotes(''); setProdHeartNotes(''); setProdBaseNotes('');
    }
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'Are you sure you want to permanently delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#666666',
      background: '#FFFFFF',
      color: '#04152F'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('/api/products/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('✔ Product deleted from database', '✨');
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const handleToggleFeatured = async (product, isFeatured) => {
    try {
      const res = await fetch('/api/products/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, isFeatured })
      });
      if (res.ok) {
        showToast(`🎉 Product updated successfully!`, '✨');
        fetchAllData();
      } else {
        showToast('❌ Server error during product update.', '✨');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', '✨');
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      if (res.ok) {
        showToast(`✔ Order ${orderId} → ${newStatus}`, '✨');
        setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (err) { console.error(err); }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setProdName(''); setProdPrice(''); setProdOriginalPrice('');
    setProdCategory('backpacks'); setProdStock('50');
    setProdScentFamily('Polyester'); setProdGender('Laptop Backpacks');
    setProdSubtitle(''); setProdDescription(''); setProdStatus('active');
    setProdImg('');
    setProdTopNotes('Ballistic Polyester');
    setProdHeartNotes('32 Liters Capacity');
    setProdBaseNotes('YKK Zippers, Laptop Compartment');
    setProdIsBestseller(false); setProdIsNew(true); setProdIsFeatured(false);
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCatName('');
    setCatEmoji('🎒');
    setCatImg('');
    setCatSubItems('');
    setCatEnabled(true);
  };

  const handleCategoryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ Image must be less than 5MB', '✨');
      return;
    }
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64: base64String })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCatImg(data.path);
          showToast('📸 Category image uploaded successfully!', '✨');
        } else {
          showToast('❌ Image upload failed: ' + (data.message || ''), '✨');
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to process image', '✨');
      setUploadingImage(false);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catName) {
      showToast('⚠️ Category name is required.', '✨');
      return;
    }
    const payload = {
      name: catName,
      emoji: catEmoji || '🎒',
      img: catImg || '',
      enabled: catEnabled,
      subItems: catSubItems ? catSubItems.split(',').map(s => s.trim()).filter(Boolean) : []
    };
    try {
      let endpoint = '/api/categories/add';
      if (catModalMode === 'edit' && editingCategory) {
        endpoint = '/api/categories/update';
        payload.id = editingCategory.id;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(`🎉 Category ${catModalMode === 'add' ? 'created' : 'updated'} successfully!`, '✨');
        fetchAllData();
        setShowCategoryModal(false);
        resetCategoryForm();
      } else {
        const data = await res.json();
        showToast('❌ Error: ' + (data.message || 'Server error'), '✨');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', '✨');
    }
  };

  const handleEditCategoryClick = (c) => {
    setCatModalMode('edit');
    setEditingCategory(c);
    setCatName(c.name);
    setCatEmoji(c.emoji || '🎒');
    setCatImg(c.img || '');
    setCatSubItems(c.subItems ? c.subItems.join(', ') : '');
    setCatEnabled(c.enabled !== false);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Category?',
      text: 'Are you sure you want to permanently delete this category? Products in this category will not be deleted, but the category listing will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#666666',
      background: '#FFFFFF',
      color: '#04152F'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('/api/categories/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        showToast('✔ Category deleted from database', '✨');
        fetchAllData();
      } else {
        showToast('❌ Failed to delete category.', '✨');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', '✨');
    }
  };

  const handleAddCategoryClick = () => {
    setCatModalMode('add');
    resetCategoryForm();
    setShowCategoryModal(true);
  };

  const resetCouponForm = () => {
    setEditingCoupon(null);
    setCoupCode('');
    setCoupType('fixed');
    setCoupValue('');
    setCoupMinSubtotal('0');
    setCoupDesc('');
    setCoupIsActive(true);
    setCoupExpiryDate('');
    setCoupUsageLimit('');
    setCoupMaxDiscount('');
  };

  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    if (!coupCode || !coupValue) {
      showToast('⚠️ Coupon code and value are required.', 'error');
      return;
    }

    const payload = {
      code: coupCode.trim().toUpperCase(),
      type: coupType,
      value: Number(coupValue),
      minSubtotal: Number(coupMinSubtotal) || 0,
      desc: coupDesc.trim(),
      isActive: coupIsActive,
      expiryDate: coupExpiryDate ? new Date(coupExpiryDate).toISOString() : null,
      usageLimit: coupUsageLimit !== '' && coupUsageLimit !== null ? Number(coupUsageLimit) : null,
      maxDiscount: coupMaxDiscount !== '' && coupMaxDiscount !== null ? Number(coupMaxDiscount) : null,
    };

    try {
      let endpoint = '/api/coupons/add';
      let body = payload;
      if (couponModalMode === 'edit' && editingCoupon) {
        endpoint = '/api/coupons/update';
        body = {
          originalCode: editingCoupon.code,
          data: payload
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`🎉 Coupon ${couponModalMode === 'add' ? 'created' : 'updated'} successfully!`, 'success');
        fetchAllData();
        setShowCouponModal(false);
        resetCouponForm();
      } else {
        showToast(`❌ Error: ${data.message || 'Server error'}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', 'error');
    }
  };

  const handleEditCouponClick = (c) => {
    setCouponModalMode('edit');
    setEditingCoupon(c);
    setCoupCode(c.code);
    setCoupType(c.type);
    setCoupValue(c.value);
    setCoupMinSubtotal(c.minSubtotal);
    setCoupDesc(c.desc || '');
    setCoupIsActive(c.isActive !== false);
    setCoupExpiryDate(c.expiryDate ? new Date(c.expiryDate).toISOString().split('T')[0] : '');
    setCoupUsageLimit(c.usageLimit !== null && c.usageLimit !== undefined ? c.usageLimit : '');
    setCoupMaxDiscount(c.maxDiscount !== null && c.maxDiscount !== undefined ? c.maxDiscount : '');
    setShowCouponModal(true);
  };

  const handleViewCouponClick = (c) => {
    setCouponModalMode('view');
    setEditingCoupon(c);
    setCoupCode(c.code);
    setCoupType(c.type);
    setCoupValue(c.value);
    setCoupMinSubtotal(c.minSubtotal);
    setCoupDesc(c.desc || '');
    setCoupIsActive(c.isActive !== false);
    setCoupExpiryDate(c.expiryDate ? new Date(c.expiryDate).toISOString().split('T')[0] : '');
    setCoupUsageLimit(c.usageLimit !== null && c.usageLimit !== undefined ? c.usageLimit : '');
    setCoupMaxDiscount(c.maxDiscount !== null && c.maxDiscount !== undefined ? c.maxDiscount : '');
    setShowCouponModal(true);
  };

  const handleDeleteCoupon = async (code) => {
    const result = await Swal.fire({
      title: 'Delete Coupon?',
      text: `Are you sure you want to permanently delete the coupon "${code}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#666666',
      background: '#FFFFFF',
      color: '#04152F'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('/api/coupons/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('✔ Coupon deleted successfully', 'success');
        setCoupons(prev => prev.filter(c => c.code !== code));
      } else {
        showToast(`❌ Failed to delete: ${data.message || 'Server error'}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', 'error');
    }
  };

  const handleToggleCouponStatus = async (c) => {
    try {
      const res = await fetch('/api/coupons/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalCode: c.code,
          data: { isActive: !c.isActive }
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`✔ Coupon ${c.code} status updated successfully`, 'success');
        fetchAllData();
      } else {
        showToast(`❌ Error: ${data.message || 'Server error'}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Connection error.', 'error');
    }
  };

  const filteredCoupons = coupons.filter(c => {
    const matchSearch = c.code.toLowerCase().includes(couponSearch.toLowerCase()) ||
                        (c.desc && c.desc.toLowerCase().includes(couponSearch.toLowerCase()));
                        
    const now = new Date();
    const isExpired = c.expiryDate && new Date(c.expiryDate) < now;
    
    let matchStatus = true;
    if (couponStatusFilter === 'active') {
      matchStatus = c.isActive && !isExpired;
    } else if (couponStatusFilter === 'inactive') {
      matchStatus = !c.isActive;
    } else if (couponStatusFilter === 'expired') {
      matchStatus = isExpired;
    }

    let matchType = true;
    if (couponTypeFilter !== 'all') {
      matchType = c.type === couponTypeFilter;
    }

    return matchSearch && matchStatus && matchType;
  });

  const totalCouponPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);
  const paginatedCoupons = [...filteredCoupons]
    .slice((couponPage - 1) * ITEMS_PER_PAGE, couponPage * ITEMS_PER_PAGE);

  if (!authorized) return null;

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = selectedCategoryFilter ? p.category === selectedCategoryFilter : true;
    return matchSearch && matchCat;
  });

  const featuredProducts = products.filter(p => p.isFeatured);

  const nonFeaturedProducts = products.filter(p => !p.isFeatured && (
    p.name.toLowerCase().includes(topProductsSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(topProductsSearch.toLowerCase())
  ) && (topProductsCatFilter ? p.category === topProductsCatFilter : true));

  const totalTopProductsAddPages = Math.ceil(nonFeaturedProducts.length / ITEMS_PER_PAGE);
  const paginatedTopProductsAdd = [...nonFeaturedProducts]
    .sort((a, b) => b.id - a.id)
    .slice((topProductsAddPage - 1) * ITEMS_PER_PAGE, topProductsAddPage * ITEMS_PER_PAGE);

  const filteredOrders = orders.filter(o =>
    orderFilter === 'all' ? true : o.status === orderFilter
  );

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const lowStockAlerts = products.filter(p => p.stock < 25);

  const getRevenueBars = () => {
    const now = new Date();

    if (revenuePeriod === '1W') {
      const days = [];
      // Generate past 7 days ending today
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        days.push({
          dateKey: d.toDateString(),
          label: d.toLocaleString('en-US', { weekday: 'short' }),
          dateNum: d.getDate(),
          revenue: 0
        });
      }

      orders.forEach(o => {
        if (o.status === 'cancelled') return;
        const orderDate = o.createdAt ? new Date(o.createdAt) : new Date(o.date);
        if (isNaN(orderDate.getTime())) return;
        const key = orderDate.toDateString();
        const matched = days.find(d => d.dateKey === key);
        if (matched) {
          matched.revenue += (o.total || 0);
        }
      });

      const maxRevenue = Math.max(...days.map(d => d.revenue), 0);
      return days.map(d => {
        const pct = maxRevenue > 0 ? Math.round((d.revenue / maxRevenue) * 100) : 0;
        let valStr = `₹${d.revenue}`;
        if (d.revenue >= 1000) valStr = `₹${(d.revenue / 1000).toFixed(1)}K`;
        return {
          m: `${d.label} ${d.dateNum}`,
          val: valStr,
          pct: pct || 2
        };
      });
    }

    if (revenuePeriod === '1M') {
      const weeks = [
        { label: 'Week 1', daysMin: 22, daysMax: 30, revenue: 0 },
        { label: 'Week 2', daysMin: 15, daysMax: 21, revenue: 0 },
        { label: 'Week 3', daysMin: 8, daysMax: 14, revenue: 0 },
        { label: 'Week 4', daysMin: 0, daysMax: 7, revenue: 0 }
      ];

      orders.forEach(o => {
        if (o.status === 'cancelled') return;
        const orderDate = o.createdAt ? new Date(o.createdAt) : new Date(o.date);
        if (isNaN(orderDate.getTime())) return;
        
        const diffTime = Math.abs(now - orderDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const matched = weeks.find(w => diffDays >= w.daysMin && diffDays <= w.daysMax);
        if (matched) {
          matched.revenue += (o.total || 0);
        }
      });

      const maxRevenue = Math.max(...weeks.map(w => w.revenue), 0);
      return weeks.map(w => {
        const pct = maxRevenue > 0 ? Math.round((w.revenue / maxRevenue) * 100) : 0;
        let valStr = '';
        if (w.revenue >= 100000) {
          valStr = `₹${(w.revenue / 100000).toFixed(1)}L`;
        } else if (w.revenue >= 1000) {
          valStr = `₹${Math.round(w.revenue / 1000)}K`;
        } else {
          valStr = `₹${w.revenue}`;
        }
        return {
          m: w.label,
          val: valStr,
          pct: pct || 2
        };
      });
    }

    // 6M or 1Y
    const months = [];
    const count = revenuePeriod === '1Y' ? 12 : 6;
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        label: d.toLocaleString('en-US', { month: 'short' }),
        revenue: 0
      });
    }

    orders.forEach(o => {
      if (o.status === 'cancelled') return;
      const orderDate = o.createdAt ? new Date(o.createdAt) : new Date(o.date);
      if (isNaN(orderDate.getTime())) return;
      const oYear = orderDate.getFullYear();
      const oMonth = orderDate.getMonth();
      
      const matched = months.find(m => m.year === oYear && m.month === oMonth);
      if (matched) {
        matched.revenue += (o.total || 0);
      }
    });

    const maxRevenue = Math.max(...months.map(m => m.revenue), 0);
    return months.map(m => {
      const pct = maxRevenue > 0 ? Math.round((m.revenue / maxRevenue) * 100) : 0;
      let valStr = '';
      if (m.revenue >= 100000) {
        valStr = `₹${(m.revenue / 100000).toFixed(1)}L`;
      } else if (m.revenue >= 1000) {
        valStr = `₹${Math.round(m.revenue / 1000)}K`;
      } else {
        valStr = `₹${m.revenue}`;
      }
      return {
        m: m.label,
        val: valStr,
        pct: pct || 2
      };
    });
  };

  const buildDonut = () => {
    if (!products.length || !categories.length) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', fontSize: '12px', color: '#666666', fontWeight: 600 }}>
          Calculating category metrics...
        </div>
      );
    }

    // Map product name -> category slug
    const productCategoryMap = {};
    products.forEach(p => {
      if (p.name && p.category) {
        productCategoryMap[p.name.toLowerCase()] = p.category;
      }
    });

    // Initialize category statistics
    const categoryStats = {};
    categories.forEach(c => {
      categoryStats[c.slug] = {
        name: c.name,
        sales: 0,
        count: 0
      };
    });

    // Count product quantity per category (for fallback)
    products.forEach(p => {
      if (p.category && categoryStats[p.category]) {
        categoryStats[p.category].count += 1;
      }
    });

    // Aggregate sales per category from non-cancelled orders
    let totalSalesVal = 0;
    orders.forEach(o => {
      if (o.status === 'cancelled') return;
      if (Array.isArray(o.itemsDetails)) {
        o.itemsDetails.forEach(item => {
          const prodName = item.name || '';
          const prodCat = productCategoryMap[prodName.toLowerCase()];
          if (prodCat && categoryStats[prodCat]) {
            const itemRevenue = (item.price || 0) * (item.quantity || 1);
            categoryStats[prodCat].sales += itemRevenue;
            totalSalesVal += itemRevenue;
          }
        });
      }
    });

    // Prepare chart data
    let chartData = [];
    const colors = [
      '#0A234D', // Navy
      '#D4A23A', // Gold
      '#143B7A', // Medium Navy/Blue
      '#E3B85A', // Gold light
      '#04152F', // Deep Navy
      '#A67C24', // Gold dark
      '#4B638A', // Muted Blue
      '#FFF5DE'  // Ivory/Cream
    ];

    Object.keys(categoryStats).forEach((slug) => {
      const stats = categoryStats[slug];
      const val = totalSalesVal > 0 ? stats.sales : stats.count;
      chartData.push({
        name: stats.name,
        value: val
      });
    });

    // Filter out zero-value categories if we have some data
    const hasAnyValue = chartData.some(d => d.value > 0);
    if (hasAnyValue) {
      chartData = chartData.filter(d => d.value > 0);
    }

    const totalSum = chartData.reduce((acc, d) => acc + d.value, 0);

    // Map colors and calculate percentages
    const finalData = chartData.map((d, idx) => {
      const pct = totalSum > 0 ? Math.round((d.value / totalSum) * 100) : 0;
      return {
        name: d.name,
        pct: pct,
        color: colors[idx % colors.length]
      };
    });

    // Ensure sum of percentages is exactly 100
    const sumPct = finalData.reduce((acc, d) => acc + d.pct, 0);
    if (sumPct > 0 && sumPct !== 100 && finalData.length > 0) {
      finalData[0].pct += (100 - sumPct);
    }

    const r = 55;
    const strokeW = 18;
    const circumference = 2 * Math.PI * r;
    let offset = 0;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          {finalData.map((d, i) => {
            const dashArray = (d.pct / 100) * circumference;
            const strokeOffset = -offset;
            offset += dashArray;
            return (
              <circle key={i} cx="70" cy="70" r={r} fill="none"
                stroke={d.color} strokeWidth={strokeW}
                strokeDasharray={`${dashArray} ${circumference}`}
                strokeDashoffset={strokeOffset}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
            );
          })}
          <text x="70" y="76" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="14" fill="#0A234D" fontWeight="bold">Sales</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {finalData.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ color: '#666666', fontWeight: 600, minWidth: '100px' }}>{d.name}</span>
              <span style={{ color: '#0A234D', fontWeight: 700 }}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NAV_ITEMS = {
    main: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, badge: null },
      { id: 'products', label: 'Products', icon: <Briefcase size={16} />, badge: products.length },
      { id: 'orders', label: 'Orders', icon: <ShoppingBag size={16} />, badge: orders.length },
      { id: 'customers', label: 'Customers', icon: <Users size={16} />, badge: null }
    ],
    catalog: [
      { id: 'categories', label: 'Categories', icon: <Tag size={16} /> }
    ],
    store: [
      { id: 'coupons', label: 'Coupons', icon: <Ticket size={16} /> }
    ]
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.5rem', borderBottom: '1px solid rgba(10, 35, 77,0.1)' }}>
        <img src="/images/buxaa-logo.png?v=2" alt="Buxaa" style={{ height: isSidebarCollapsed ? '32px' : '40px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
        {!isSidebarCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.1em', color: '#E3B85A' }}>Buxaa Admin</span>
            <span style={{ fontSize: '8px', letterSpacing: '0.25em', color: '#666666', textTransform: 'uppercase', fontWeight: 700 }}>Management Portal</span>
          </div>
        )}
      </div>

      {/* Nav Sections */}
      <div style={{ flexGrow: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
        {[
          { title: 'Main', items: NAV_ITEMS.main },
          { title: 'Catalog', items: NAV_ITEMS.catalog },
          { title: 'Store', items: NAV_ITEMS.store }
        ].map(section => (
          <div key={section.title}>
            {!isSidebarCollapsed && (
              <div style={{ padding: '0 1.5rem', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#666666', fontWeight: 700, marginBottom: '0.35rem' }}>
                {section.title}
              </div>
            )}
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.875rem 1.5rem', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
                  background: activeTab === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: activeTab === item.id ? '#E3B85A' : '#999999',
                  borderLeft: activeTab === item.id ? '4px solid #D4A23A' : '4px solid transparent',
                  border: 'none', borderLeftStyle: 'solid', borderLeftWidth: '4px',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => { if (activeTab !== item.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={e => { if (activeTab !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#999999'; } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.badge !== null && item.badge !== undefined && (
                  <span style={{ background: 'rgba(212, 162, 58,0.25)', color: '#E3B85A', fontSize: '9px', padding: '1px 7px', borderRadius: '999px', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid rgba(10, 35, 77,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', background: 'rgba(212, 162, 58,0.15)', color: '#E3B85A',
            fontWeight: 700, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '0.75rem', borderRadius: '2px', border: 'none', cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212, 162, 58,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(212, 162, 58,0.15)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <LogOut size={14} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </div>
        </button>
      </div>
    </>
  );

  const totalProductPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = [...filteredProducts]
    .sort((a, b) => b.id - a.id)
    .slice((productPage - 1) * ITEMS_PER_PAGE, productPage * ITEMS_PER_PAGE);

  const totalOrderPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = [...filteredOrders]
    .sort((a, b) => {
      const numA = parseInt(a.id.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.id.replace(/\D/g, '')) || 0;
      return numB - numA;
    })
    .slice((orderPage - 1) * ITEMS_PER_PAGE, orderPage * ITEMS_PER_PAGE);

  const totalCustomerPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = [...customers]
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .slice((customerPage - 1) * ITEMS_PER_PAGE, customerPage * ITEMS_PER_PAGE);

  const totalCategoryPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const paginatedCategories = [...categories]
    .sort((a, b) => b.id - a.id)
    .slice((categoryPage - 1) * ITEMS_PER_PAGE, categoryPage * ITEMS_PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#F5F5F5' }}>
      <Helmet>
        <title>Admin Control Panel | BUXAA</title>
        <meta name="description" content="Manage product catalogs, customer databases, orders, and coupon campaigns." />
      </Helmet>
      {/* ── Mobile overlay backdrop ── */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(4, 21, 47,0.6)',
            backdropFilter: 'blur(4px)', zIndex: 40
          }}
        />
      )}

      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Desktop Sidebar ── */}
        <aside
          style={{
            background: '#04152F', color: '#F5F5F5', flexShrink: 0,
            width: isSidebarCollapsed ? '72px' : '240px',
            display: 'none', flexDirection: 'column',
            borderRight: '1px solid rgba(10, 35, 77,0.12)',
            transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
            position: 'sticky', top: 0, height: '100vh', overflow: 'hidden'
          }}
          className="admin-sidebar-desktop"
        >
          <SidebarContent />
        </aside>

        {/* ── Mobile Drawer Sidebar ── */}
        <aside
          style={{
            background: '#04152F', color: '#F5F5F5',
            width: '260px', maxWidth: '80vw',
            position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
            flexDirection: 'column', overflowY: 'auto',
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: isSidebarOpen ? '4px 0 30px rgba(0,0,0,0.4)' : 'none',
            display: 'flex'
          }}
          className="admin-sidebar-mobile"
        >
          {/* Close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.08)',
              border: 'none', color: '#E3B85A', width: '32px', height: '32px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1
            }}
          ><X size={16} /></button>
          <SidebarContent />
        </aside>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Sticky Topbar */}
          <header style={{
            background: '#fff', borderBottom: '1px solid rgba(10, 35, 77,0.5)',
            padding: '0 1.25rem', height: '64px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="admin-hamburger"
                style={{
                  background: 'transparent', border: 'none',
                  color: '#666666', cursor: 'pointer', padding: '4px',
                  display: 'none', alignItems: 'center', justifyContent: 'center'
                }}
                aria-label="Open menu"
              ><Menu size={20} /></button>
              {/* Desktop collapse toggle */}
              <button
                onClick={() => setIsSidebarCollapsed(prev => !prev)}
                className="admin-collapse-btn"
                style={{
                  background: 'transparent', border: 'none',
                  color: '#666666', cursor: 'pointer', padding: '4px',
                  display: 'none', alignItems: 'center', justifyContent: 'center'
                }}
                aria-label="Toggle sidebar"
              ><Menu size={20} /></button>
              <h2 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '1.15rem',
                fontWeight: 700, textTransform: 'capitalize', color: '#0A234D', letterSpacing: '0.05em'
              }}>{activeTab}</h2>
            </div>

            {/* Search — hidden on small screens */}
            <div className="admin-topbar-search" style={{
              display: 'flex', alignItems: 'center', background: '#F5F5F5',
              border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', gap: '8px', width: '220px'
            }}>
              <Search size={14} style={{ color: '#666666' }} />
              <input
                type="text"
                placeholder="Search catalog, users..."
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '12px', width: '100%', color: '#4A3B1F' }}
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                onClick={handleLogout}
                title="Sign Out"
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%', background: '#D4A23A',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                }}>A</div>
                <div className="admin-user-label" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <strong style={{ fontSize: '11px', color: '#0A234D' }}>BUXAA Admin</strong>
                  <span style={{ fontSize: '10px', color: '#666666', fontWeight: 600 }}>Sign Out</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', flexGrow: 1 }}>

            {/* ── DASHBOARD ── */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 700, color: '#0A234D', margin: 0 }}>
                      Good Morning, Admin! 👋
                    </h2>
                    <p style={{ fontSize: '12px', color: '#666666', fontWeight: 600, marginTop: '4px', margin: '4px 0 0' }}>Here's what's happening with BUXAA today</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setActiveTab('orders')} className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <LayoutDashboard size={13} /> View Reports
                    </button>
                    <button onClick={() => { setModalMode('add'); resetForm(); setShowProductModal(true); }} className="btn btn-gold btn-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Plus size={13} /> Add Product
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                  {[
                    { icon: '💰', value: formatPrice(totalRevenue), label: 'Total Revenue', trend: '↑ 23.5%', trendUp: true, cardClass: 'gold' },
                    { icon: '📦', value: orders.length, label: 'Total Orders', trend: '↑ Live DB', trendUp: true, cardClass: 'blue' },
                    { icon: '👥', value: customers.length, label: 'Active Customers', trend: '↑ 12.1%', trendUp: true, cardClass: 'green' },
                    { icon: '⏳', value: pendingOrders, label: 'Pending Orders', trend: '↓ needs attention', trendUp: false, cardClass: 'red' }
                  ].map((s, i) => (
                    <div key={i} className={`stat-card ${s.cardClass}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span>{s.icon}</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: s.trendUp ? '#16a34a' : '#dc2626' }}>{s.trend}</span>
                      </div>
                      <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 700, color: '#0A234D', marginBottom: '4px' }}>{s.value}</div>
                      <div style={{ fontSize: '10px', color: '#666666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {/* Revenue bar chart */}
                  <div className="chart-card" style={{ background: '#fff', border: '1px solid #EAEAEA', padding: '1.25rem', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}>
                      <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', fontWeight: 700, color: '#0A234D', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Revenue Overview</h4>
                      <div style={{ display: 'flex', border: '1px solid #EAEAEA', borderRadius: '2px', overflow: 'hidden', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {['1W', '1M', '6M', '1Y'].map(p => (
                          <button
                            key={p}
                            onClick={() => setRevenuePeriod(p)}
                            style={{
                              padding: '3px 8px',
                              background: revenuePeriod === p ? '#D4A23A' : '#F5F5F5',
                              color: revenuePeriod === p ? '#FFFFFF' : '#666666',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 700,
                              borderRight: p !== '1Y' ? '1px solid #EAEAEA' : 'none'
                            }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: revenuePeriod === '1Y' ? '4px' : revenuePeriod === '1W' ? '8px' : revenuePeriod === '1M' ? '12px' : '6px', borderBottom: '1px solid rgba(10, 35, 77,0.4)', paddingBottom: '8px' }}>
                      {getRevenueBars().map((bar, idx) => (
                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                          <div
                            style={{ background: '#D4A23A', width: '100%', borderRadius: '2px 2px 0 0', height: `${bar.pct}%`, transition: 'background 0.2s', cursor: 'pointer', position: 'relative' }}
                            title={bar.val}
                            onMouseEnter={e => e.currentTarget.style.background = '#A67C24'}
                            onMouseLeave={e => e.currentTarget.style.background = '#D4A23A'}
                          />
                          <span style={{ fontSize: '9px', color: '#666666', fontWeight: 700, textTransform: 'uppercase' }}>{bar.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Donut chart */}
                  <div className="chart-card" style={{ background: '#fff', border: '1px solid #EAEAEA', padding: '1.25rem', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}>
                      <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', fontWeight: 700, color: '#0A234D', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Sales by Category</h4>
                    </div>
                    {buildDonut()}
                  </div>
                </div>

                {/* Low Stock Alerts */}
                {lowStockAlerts.length > 0 && (
                  <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(10, 35, 77,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} /> Low Stock Alerts
                    </h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-table" style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                            <th style={{ padding: '10px 16px' }}>Product</th>
                            <th style={{ padding: '10px 16px' }}>Stock</th>
                            <th style={{ padding: '10px 16px' }}>Status</th>
                            <th style={{ padding: '10px 16px', textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lowStockAlerts.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}>
                              <td style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={getImageUrl(p.img)} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '2px', objectFit: 'cover', border: '1px solid #EAEAEA', flexShrink: 0 }} />
                                <div>
                                  <strong style={{ fontSize: '12px', color: '#0A234D', display: 'block' }}>{p.name}</strong>
                                  <span style={{ fontSize: '10px', color: '#666666' }}>{p.concentration}</span>
                                </div>
                              </td>
                              <td style={{ padding: '10px 16px', color: '#dc2626', fontWeight: 700 }}>{p.stock} units</td>
                              <td style={{ padding: '10px 16px' }}>
                                <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 10px', borderRadius: '999px', fontSize: '9px', textTransform: 'uppercase', fontWeight: 700 }}>Critical</span>
                              </td>
                              <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                                <button onClick={() => handleEditClick(p)} className="btn btn-gold btn-sm" style={{ cursor: 'pointer', padding: '5px 14px' }}>Restock</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── PRODUCTS ── */}
            {activeTab === 'products' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10, 35, 77,0.45)' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: '#0A234D', margin: 0 }}>Product Inventory</h2>
                    <p style={{ fontSize: '12px', color: '#666666', fontWeight: 600, margin: '3px 0 0' }}>Manage your collections</p>
                  </div>
                  <button onClick={() => { setModalMode('add'); resetForm(); setShowProductModal(true); }} className="btn btn-gold" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={14} /> Add New Product
                  </button>
                </div>

                <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {/* Filters */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(10, 35, 77,0.4)' }}>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', fontWeight: 700, color: '#0A234D', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>All Products ({products.length})</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <input type="search" placeholder="Search products..." style={{ background: '#F5F5F5', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', width: '160px' }} value={productSearch} onChange={e => setProductSearch(e.target.value)} />
                      <select value={selectedCategoryFilter} onChange={e => setSelectedCategoryFilter(e.target.value)} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div style={{ overflowX: 'auto' }} className="admin-desktop-table">
                    <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                          {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '12px 16px', whiteSpace: 'nowrap', textAlign: h === 'Actions' ? 'center' : 'left' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedProducts.map(p => {
                          const statusClass = p.status === 'draft' ? 'status-pending' : p.stock > 0 ? 'status-active' : 'status-inactive';
                          const statusText = p.status === 'draft' ? 'Draft' : p.stock > 0 ? 'Active' : 'Out of Stock';
                          return (
                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 245, 245,0.2)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <td style={{ padding: '12px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <img src={getImageUrl(p.img)} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '2px', objectFit: 'cover', border: '1px solid rgba(10, 35, 77,0.3)', flexShrink: 0 }} />
                                  <div>
                                    <strong style={{ fontSize: '13px', color: '#0A234D', display: 'block' }}>{p.name}</strong>
                                    <span style={{ fontSize: '10px', color: '#666666', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                      {p.concentration}
                                      {p.isBestseller && <Star size={10} fill="#D4A23A" color="#D4A23A" title="Top Product" />}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{p.sku || `BXX-${String(p.id).padStart(4, '0')}`}</td>
                              <td style={{ padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '10px', color: '#D4A23A' }}>{p.category}</td>
                              <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                <strong style={{ color: '#0A234D' }}>{formatPrice(p.price)}</strong>
                                {p.originalPrice && <div style={{ fontSize: '10px', color: '#999999', textDecoration: 'line-through' }}>{formatPrice(p.originalPrice)}</div>}
                              </td>
                              <td style={{ padding: '12px 16px' }}><span style={{ color: p.stock < 25 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>{p.stock}</span></td>
                              <td style={{ padding: '12px 16px' }}><span className={`status-badge ${statusClass}`}>{statusText}</span></td>
                              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                  <button onClick={() => handleEditClick(p)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                                  <button onClick={() => handleDeleteProduct(p.id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card List */}
                  <div className="admin-mobile-cards">
                    {paginatedProducts.map(p => {
                      const statusText = p.status === 'draft' ? 'Draft' : p.stock > 0 ? 'Active' : 'Out of Stock';
                      const statusColor = p.status === 'draft' ? '#b45309' : p.stock > 0 ? '#16a34a' : '#dc2626';
                      return (
                        <div key={p.id} style={{ background: '#F5F5F5', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '0.85rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <img src={getImageUrl(p.img)} alt={p.name} style={{ width: '54px', height: '54px', borderRadius: '2px', objectFit: 'cover', border: '1px solid #EAEAEA', flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <strong style={{ fontSize: '13px', color: '#0A234D', lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {p.name}
                                {p.isBestseller && <Star size={10} fill="#D4A23A" color="#D4A23A" title="Top Product" />}
                              </strong>
                              <span style={{ background: statusColor + '18', color: statusColor, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '999px', flexShrink: 0 }}>{statusText}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#D4A23A', textTransform: 'uppercase', marginTop: '3px' }}>{p.category}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', alignItems: 'center' }}>
                              <strong style={{ fontSize: '14px', color: '#0A234D' }}>{formatPrice(p.price)}</strong>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button onClick={() => handleEditClick(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                                <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                              </div>
                            </div>
                            <div style={{ fontSize: '11px', color: p.stock < 25 ? '#dc2626' : '#16a34a', fontWeight: 600, marginTop: '2px' }}>Stock: {p.stock}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {renderPagination(productPage, totalProductPages, setProductPage)}
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10, 35, 77,0.45)' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: '#0A234D', margin: 0 }}>Store Order Sheets</h2>
                    <p style={{ fontSize: '12px', color: '#666666', fontWeight: 600, margin: '3px 0 0' }}>Manage customer purchases and delivery status</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#666666', fontWeight: 700 }}>Filter:</span>
                    <select value={orderFilter} onChange={e => setOrderFilter(e.target.value)} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                      {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(v => (
                        <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}{v === 'all' ? ' Orders' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Desktop Table */}
                <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflowX: 'auto' }} className="admin-desktop-table">
                  <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse', minWidth: '640px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                        {['Order ID', 'Date', 'Customer', 'City', 'Total', 'Status', 'Update'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map(o => {
                        const statusColors = { delivered: { bg: '#f0fdf4', text: '#16a34a' }, shipped: { bg: '#eff6ff', text: '#2563eb' }, pending: { bg: '#fefce8', text: '#ca8a04' }, cancelled: { bg: '#fef2f2', text: '#dc2626' } };
                        const sc = statusColors[o.status] || { bg: '#fff7ed', text: '#ea580c' };
                        return (
                          <tr key={o.id} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 245, 245,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '12px 16px', color: '#666666', fontWeight: 700 }}>{o.id}</td>
                            <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                              {o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : o.date}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#0A234D' }}>{o.customer}</td>
                            <td style={{ padding: '12px 16px' }}>{o.city}</td>
                            <td style={{ padding: '12px 16px', color: '#D4A23A', fontWeight: 700, whiteSpace: 'nowrap' }}>{formatPrice(o.total)}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ background: sc.bg, color: sc.text, padding: '2px 10px', borderRadius: '999px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' }}>{o.status}</span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <select value={o.status} onChange={e => handleOrderStatusUpdate(o.id, e.target.value)} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '4px 8px', fontSize: '10px', outline: 'none', cursor: 'pointer', fontWeight: 700 }}>
                                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(v => (
                                  <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Order Cards */}
                <div className="admin-mobile-cards">
                  {paginatedOrders.map(o => {
                    const statusColors = { delivered: '#16a34a', shipped: '#2563eb', pending: '#ca8a04', cancelled: '#dc2626' };
                    const sc = statusColors[o.status] || '#ea580c';
                    return (
                      <div key={o.id} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ color: '#666666', fontSize: '12px' }}>{o.id}</strong>
                          <span style={{ background: sc + '18', color: sc, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '999px' }}>{o.status}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#0A234D', fontWeight: 700, marginBottom: '3px' }}>{o.customer}</div>
                        <div style={{ fontSize: '11px', color: '#666666', marginBottom: '6px' }}>{o.city} · {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : o.date}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '14px', color: '#D4A23A' }}>{formatPrice(o.total)}</strong>
                          <select value={o.status} onChange={e => handleOrderStatusUpdate(o.id, e.target.value)} style={{ background: '#F5F5F5', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '4px 8px', fontSize: '11px', outline: 'none', cursor: 'pointer', fontWeight: 600 }}>
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(v => (
                              <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {renderPagination(orderPage, totalOrderPages, setOrderPage)}
              </div>
            )}

            {/* ── CUSTOMERS ── */}
            {activeTab === 'customers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: '#0A234D', paddingBottom: '1rem', borderBottom: '1px solid rgba(10, 35, 77,0.45)', margin: 0 }}>Accounts Directory</h2>
                <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflowX: 'auto' }} className="admin-desktop-table">
                  <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse', minWidth: '500px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                        {['#', 'Name', 'Email', 'Phone', 'City', 'Joined'].map(h => <th key={h} style={{ padding: '12px 16px' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCustomers.map((c, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 245, 245,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <td style={{ padding: '12px 16px', color: '#666666' }}>#{c.id || idx + 1}</td>
                          <td style={{ padding: '12px 16px', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#0A234D' }}>{c.name}</td>
                          <td style={{ padding: '12px 16px' }}>{c.email}</td>
                          <td style={{ padding: '12px 16px' }}>{c.phone || '—'}</td>
                          <td style={{ padding: '12px 16px' }}>{c.city}</td>
                          <td style={{ padding: '12px 16px', color: '#666666' }}>{c.joined || 'May 2024'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="admin-mobile-cards">
                  {paginatedCustomers.map((c, idx) => (
                    <div key={idx} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#D4A23A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                          {c.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0A234D', display: 'block' }}>{c.name}</strong>
                          <span style={{ fontSize: '11px', color: '#666666' }}>{c.email}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '11px', color: '#666666', paddingTop: '6px', borderTop: '1px solid rgba(10, 35, 77,0.3)', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {c.city || '—'}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {c.phone || '—'}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {c.joined || 'May 2024'}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination(customerPage, totalCustomerPages, setCustomerPage)}
              </div>
            )}

            {/* ── COUPONS ── */}
            {activeTab === 'coupons' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10, 35, 77,0.45)' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: '#0A234D', margin: 0 }}>Coupons Control Panel</h2>
                    <p style={{ fontSize: '12px', color: '#666666', fontWeight: 600, margin: '3px 0 0' }}>Manage customer discount vouchers and campaigns</p>
                  </div>
                  <button onClick={() => { setCouponModalMode('add'); resetCouponForm(); setShowCouponModal(true); }} className="btn btn-gold" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={14} /> Add New Coupon
                  </button>
                </div>

                <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {/* Filters */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(10, 35, 77,0.4)' }}>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', fontWeight: 700, color: '#0A234D', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>All Coupons ({filteredCoupons.length})</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <input type="search" placeholder="Search code..." style={{ background: '#F5F5F5', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', width: '150px' }} value={couponSearch} onChange={e => setCouponSearch(e.target.value)} />
                      <select value={couponStatusFilter} onChange={e => setCouponStatusFilter(e.target.value)} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                      </select>
                      <select value={couponTypeFilter} onChange={e => setCouponTypeFilter(e.target.value)} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 12px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                        <option value="all">All Types</option>
                        <option value="percent">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                  </div>

                  {/* Desktop Coupons Table */}
                  <div style={{ overflowX: 'auto' }} className="admin-desktop-table">
                    <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                          {['Code', 'Type', 'Value', 'Min Order', 'Limit (Used)', 'Expiry', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '12px 16px', whiteSpace: 'nowrap', textAlign: h === 'Actions' ? 'center' : 'left' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedCoupons.map((coupon, idx) => {
                          const now = new Date();
                          const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < now;
                          
                          let statusClass = 'status-active';
                          let statusText = 'Active';
                          if (!coupon.isActive) {
                            statusClass = 'status-inactive';
                            statusText = 'Inactive';
                          } else if (isExpired) {
                            statusClass = 'status-pending'; // using yellow/red style
                            statusText = 'Expired';
                          }

                          return (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 245, 245,0.2)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <td style={{ padding: '12px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                 <strong style={{ fontSize: '13px', color: '#0A234D', cursor: 'pointer' }} onClick={() => handleViewCouponClick(coupon)}>{coupon.code}</strong>
                                 <button
                                   onClick={() => {
                                     navigator.clipboard.writeText(coupon.code);
                                     showToast(`📋 Copied "${coupon.code}" to clipboard!`, 'success');
                                   }}
                                   title="Copy Code"
                                   style={{
                                     background: 'none',
                                     border: 'none',
                                     cursor: 'pointer',
                                     display: 'inline-flex',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                     padding: '4px',
                                     color: '#D4A23A',
                                     borderRadius: '4px',
                                     transition: 'background 0.2s',
                                   }}
                                   onMouseEnter={e => e.currentTarget.style.background = 'rgba(212, 162, 58, 0.1)'}
                                   onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                 >
                                   <Copy size={13} />
                                 </button>
                               </div>
                              </td>
                              <td style={{ padding: '12px 16px', textTransform: 'capitalize' }}>{coupon.type}</td>
                              <td style={{ padding: '12px 16px', color: '#0A234D', fontWeight: 700 }}>
                                {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                                {coupon.type === 'percent' && coupon.maxDiscount && (
                                  <div style={{ fontSize: '9px', color: '#666666', fontWeight: 'normal' }}>Cap: ₹{coupon.maxDiscount}</div>
                                )}
                              </td>
                              <td style={{ padding: '12px 16px' }}>₹{coupon.minSubtotal?.toLocaleString('en-IN') || 0}</td>
                              <td style={{ padding: '12px 16px' }}>
                                {coupon.usageLimit !== null && coupon.usageLimit !== undefined ? `${coupon.usedCount || 0} / ${coupon.usageLimit}` : `${coupon.usedCount || 0} / ∞`}
                              </td>
                              <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString('en-IN') : '—'}
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <span className={`status-badge ${statusClass}`} style={{ display: 'inline-block' }}>{statusText}</span>
                              </td>
                              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                  <button
                                    onClick={() => handleToggleCouponStatus(coupon)}
                                    title={coupon.isActive ? 'Deactivate' : 'Activate'}
                                    style={{
                                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px',
                                      color: coupon.isActive ? '#666666' : '#D4A23A', fontWeight: 700, textTransform: 'uppercase'
                                    }}
                                  >
                                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                                  </button>
                                  <button onClick={() => handleEditCouponClick(coupon)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                                  <button onClick={() => handleDeleteCoupon(coupon.code)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Coupons Card List */}
                  <div className="admin-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {paginatedCoupons.map((coupon, idx) => {
                      const now = new Date();
                      const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < now;
                      
                      let statusText = 'Active';
                      let statusColor = '#16a34a';
                      if (!coupon.isActive) {
                        statusText = 'Inactive';
                        statusColor = '#666666';
                      } else if (isExpired) {
                        statusText = 'Expired';
                        statusColor = '#dc2626';
                      }

                      return (
                        <div key={idx} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '0.85rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <strong style={{ fontSize: '14px', color: '#0A234D', cursor: 'pointer' }} onClick={() => handleViewCouponClick(coupon)}>{coupon.code}</strong>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(coupon.code);
                                  showToast(`📋 Copied "${coupon.code}" to clipboard!`, 'success');
                                }}
                                title="Copy Code"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: '4px',
                                  color: '#D4A23A',
                                }}
                              >
                                <Copy size={13} />
                              </button>
                            </div>
                            <span style={{ background: statusColor + '18', color: statusColor, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '999px' }}>{statusText}</span>
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#D4A23A', marginBottom: '4px' }}>
                            {coupon.type === 'percent' ? `${coupon.value}% Off` : `₹${coupon.value} Off`}
                            {coupon.type === 'percent' && coupon.maxDiscount && ` (Cap ₹${coupon.maxDiscount})`}
                          </div>
                          <div style={{ fontSize: '11px', color: '#666666', marginBottom: '6px' }}>
                            Min order: ₹{coupon.minSubtotal} · Used: {coupon.usedCount}/{coupon.usageLimit || '∞'}
                            <div style={{ marginTop: '2px' }}>Expiry: {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString('en-IN') : 'None'}</div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(10, 35, 77,0.3)', paddingTop: '8px', marginTop: '4px' }}>
                            <button
                              onClick={() => handleToggleCouponStatus(coupon)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: '#D4A23A', fontWeight: 700, textTransform: 'uppercase' }}
                            >
                              Toggle Status
                            </button>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <button onClick={() => handleEditCouponClick(coupon)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                              <button onClick={() => handleDeleteCoupon(coupon.code)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {renderPagination(couponPage, totalCouponPages, setCouponPage)}
                </div>
              </div>
            )}

            {/* ── CATEGORIES ── */}
            {activeTab === 'categories' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10, 35, 77,0.45)' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: '#0A234D', margin: 0 }}>Categories & Collections</h2>
                    <p style={{ fontSize: '12px', color: '#666666', fontWeight: 600, margin: '3px 0 0' }}>Manage product taxonomy & shop categories</p>
                  </div>
                  <button onClick={handleAddCategoryClick} className="btn btn-gold" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={14} /> Add New Category
                  </button>
                </div>

                <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflowX: 'auto' }} className="admin-desktop-table">
                  <table style={{ width: '100%', textAlign: 'left', fontSize: '12px', color: '#4A3B1F', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(245, 245, 245,0.5)', borderBottom: '1px solid rgba(10, 35, 77,0.5)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666666', fontWeight: 700 }}>
                        {['ID', 'Image', 'Icon', 'Name', 'Slug', 'Products', 'Status', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Actions' ? 'center' : 'left' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCategories.map((c, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(10, 35, 77,0.3)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(245, 245, 245,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <td style={{ padding: '12px 16px', color: '#666666' }}>#{c.id}</td>
                          <td style={{ padding: '12px 16px' }}>
                            {c.img ? (
                              <img src={getImageUrl(c.img)} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '2px', objectFit: 'cover', border: '1px solid rgba(10, 35, 77,0.3)' }} />
                            ) : (
                              <span style={{ fontSize: '11px', color: '#666666' }}>No image</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            {(() => {
                              const IconComponent = categoryIconMap[c.slug] || Sparkles;
                              return <IconComponent size={18} style={{ color: '#666666' }} />;
                            })()}
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#0A234D' }}>{c.name}</td>
                          <td style={{ padding: '12px 16px', color: '#666666', fontFamily: 'monospace', fontSize: '11px' }}>/shop?cat={c.slug}</td>
                          <td style={{ padding: '12px 16px' }}>{c.count || 0} items</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span className={`status-badge ${c.enabled !== false ? 'status-active' : 'status-inactive'}`}>
                              {c.enabled !== false ? 'Enabled' : 'Disabled'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                              <button onClick={() => handleEditCategoryClick(c)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                              <button onClick={() => handleDeleteCategory(c.id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '4px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="admin-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {paginatedCategories.map((c, idx) => {
                    const statusColor = c.enabled !== false ? '#16a34a' : '#dc2626';
                    const statusText = c.enabled !== false ? 'Enabled' : 'Disabled';
                    return (
                      <div key={idx} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', padding: '0.85rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        {c.img ? (
                          <img src={getImageUrl(c.img)} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '2px', objectFit: 'cover', border: '1px solid #EAEAEA', flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '2px', background: '#F5F5F5', border: '1px solid #EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {(() => {
                              const IconComponent = categoryIconMap[c.slug] || Sparkles;
                              return <IconComponent size={20} style={{ color: '#D4A23A' }} />;
                            })()}
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <strong style={{ fontSize: '13px', color: '#0A234D', lineHeight: 1.3 }}>
                              {c.name}
                            </strong>
                            <span style={{ background: statusColor + '18', color: statusColor, fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '999px', flexShrink: 0 }}>
                              {statusText}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#666666', marginTop: '2px' }}>
                            Slug: {c.slug} · {c.count || 0} items
                          </div>
                          {c.subItems && c.subItems.length > 0 && (
                            <div style={{ fontSize: '10px', color: '#D4A23A', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              Subcategories: {c.subItems.join(', ')}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexShrink: 0, paddingLeft: '8px', borderLeft: '1px solid rgba(10, 35, 77,0.4)', alignItems: 'center' }}>
                          <button onClick={() => handleEditCategoryClick(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Pencil size={14} style={{ color: '#666666' }} /></button>
                          <button onClick={() => handleDeleteCategory(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}><Trash2 size={14} style={{ color: '#dc2626' }} /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {renderPagination(categoryPage, totalCategoryPages, setCategoryPage)}
              </div>
            )}

            {/* Top Products section has been removed as per user request to only use the single Top Product checkbox */}



          </div>
        </div>
      </div>

      {/* ── Product Add / Edit Modal ── */}
      {showProductModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 21, 47,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', maxWidth: '540px', width: '100%', maxHeight: '92vh', overflowY: 'auto', padding: '1.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button onClick={() => { setShowProductModal(false); resetForm(); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.06)', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A234D', borderBottom: '1px solid rgba(10, 35, 77,0.4)', paddingBottom: '1rem', marginBottom: '1.25rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {modalMode === 'add' ? <Plus size={16} /> : <Pencil size={15} />}
              {modalMode === 'add' ? 'Add Product' : 'Edit Product'}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '12px', color: '#4A3B1F' }}>
              {[
                { label: 'Bag Name / Model *', value: prodName, setter: setProdName, type: 'text', required: true },
                { label: 'Subtitle / Quick Pitch *', value: prodSubtitle, setter: setProdSubtitle, type: 'text', required: true, placeholder: 'e.g., Spacious travel backpack for daily commutes' }
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                  <input type={f.type} required={f.required} placeholder={f.placeholder || ''} value={f.value} onChange={e => f.setter(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Sale Price (₹) *', value: prodPrice, setter: setProdPrice, required: true },
                  { label: 'Original Price (optional)', value: prodOriginalPrice, setter: setProdOriginalPrice, required: false }
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                    <input type="number" required={f.required} value={f.value} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Category *</label>
                  <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Sub-Category *</label>
                  <select value={prodGender} onChange={e => setProdGender(e.target.value)} style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    {(categories.find(c => c.slug === prodCategory)?.subItems || []).map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Stock *</label>
                  <input type="number" required value={prodStock} onChange={e => setProdStock(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Material / Build *</label>
                  <select value={prodScentFamily} onChange={e => setProdScentFamily(e.target.value)} style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    {['Polyester', 'Nylon', 'Leather', 'Canvas', 'Polycarbonate'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Status</label>
                  <select value={prodStatus} onChange={e => setProdStatus(e.target.value)} style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    {['active', 'draft', 'inactive'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Product Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {prodImg && (
                    <img src={prodImg.startsWith('data:') ? prodImg : getImageUrl(prodImg)} alt="Preview"
                      style={{ width: '36px', height: '36px', borderRadius: '2px', objectFit: 'cover', border: '1px solid #EAEAEA', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage}
                      style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 8px', fontSize: '10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                    />
                    {uploadingImage && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#666666' }}>Uploading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { label: 'Fabric Details *', value: prodTopNotes, setter: setProdTopNotes, placeholder: 'e.g., Ballistic Polyester' },
                  { label: 'Capacity *', value: prodHeartNotes, setter: setProdHeartNotes, placeholder: 'e.g., 32 Liters' },
                  { label: 'Key Features *', value: prodBaseNotes, setter: setProdBaseNotes, placeholder: 'e.g., YKK Zippers' }
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                    <input type="text" required placeholder={f.placeholder} value={f.value} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(10, 35, 77,0.4)', paddingTop: '0.85rem' }}>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '8px' }}>Homepage Display & Badges</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontWeight: 600, fontSize: '12px' }}>
                  {[
                    { label: 'Top Product (Shows on Homepage)', checked: prodIsBestseller, setter: setProdIsBestseller }
                  ].map(f => (
                    <label key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={f.checked} onChange={e => f.setter(e.target.checked)} style={{ accentColor: '#D4A23A', cursor: 'pointer', width: '14px', height: '14px' }} />
                      <span>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Product Description</label>
                <textarea rows="3" value={prodDescription} onChange={e => setProdDescription(e.target.value)} placeholder="<p>Detailed product description...</p>"
                  style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '12px' }}
                  onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
              </div>

              <button type="submit" style={{ background: '#D4A23A', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#A67C24'} onMouseLeave={e => e.currentTarget.style.background = '#D4A23A'}>
                {modalMode === 'add' ? 'Add to Catalog' : 'Save Product Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Category Add / Edit Modal ── */}
      {showCategoryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 21, 47,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', maxWidth: '480px', width: '100%', maxHeight: '92vh', overflowY: 'auto', padding: '1.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button onClick={() => { setShowCategoryModal(false); resetCategoryForm(); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.06)', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A234D', borderBottom: '1px solid rgba(10, 35, 77,0.4)', paddingBottom: '1rem', marginBottom: '1.25rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {catModalMode === 'add' ? <Plus size={16} /> : <Pencil size={15} />}
              {catModalMode === 'add' ? 'Add Category' : 'Edit Category'}
            </h3>

            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '12px', color: '#4A3B1F' }}>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Category Name *</label>
                <input type="text" required placeholder="e.g., Backpacks" value={catName} onChange={e => setCatName(e.target.value)}
                  style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Status</label>
                  <select value={catEnabled ? 'enabled' : 'disabled'} onChange={e => setCatEnabled(e.target.value === 'enabled')} style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Category Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {catImg && (
                    <img src={getImageUrl(catImg)} alt="Preview"
                      style={{ width: '36px', height: '36px', borderRadius: '2px', objectFit: 'cover', border: '1px solid #EAEAEA', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input type="file" accept="image/*" onChange={handleCategoryImageUpload} disabled={uploadingImage}
                      style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '6px 8px', fontSize: '10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                    />
                    {uploadingImage && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#666666' }}>Uploading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Sub-Categories / Sub-Items (Comma-separated)</label>
                <textarea rows="3" value={catSubItems} onChange={e => setCatSubItems(e.target.value)} placeholder="e.g., Laptop Backpacks, Travel Backpacks, Casual Backpacks"
                  style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '12px' }}
                  onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
                <span style={{ fontSize: '10px', color: '#666666', marginTop: '2px', display: 'block' }}>These are used as sub-filters and options when managing products.</span>
              </div>

              <button type="submit" style={{ background: '#D4A23A', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#A67C24'} onMouseLeave={e => e.currentTarget.style.background = '#D4A23A'}>
                {catModalMode === 'add' ? 'Create Category' : 'Save Category Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Coupon Add / Edit / View Modal ── */}
      {showCouponModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4, 21, 47,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '4px', maxWidth: '480px', width: '100%', maxHeight: '92vh', overflowY: 'auto', padding: '1.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button onClick={() => { setShowCouponModal(false); resetCouponForm(); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.06)', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A234D', borderBottom: '1px solid rgba(10, 35, 77,0.4)', paddingBottom: '1rem', marginBottom: '1.25rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {couponModalMode === 'add' ? <Plus size={16} /> : couponModalMode === 'edit' ? <Pencil size={15} /> : <Ticket size={15} />}
              {couponModalMode === 'add' ? 'Add Coupon' : couponModalMode === 'edit' ? 'Edit Coupon' : 'Coupon Details'}
            </h3>

            <form onSubmit={handleSaveCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '12px', color: '#4A3B1F' }}>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Coupon Code *</label>
                <input
                  type="text"
                  required
                  disabled={couponModalMode === 'view'}
                  placeholder="e.g., BUXAA10"
                  value={coupCode}
                  onChange={e => setCoupCode(e.target.value.toUpperCase())}
                  style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Discount Type *</label>
                  <select
                    value={coupType}
                    disabled={couponModalMode === 'view'}
                    onChange={e => setCoupType(e.target.value)}
                    style={{ width: '100%', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Discount Value *</label>
                  <input
                    type="number"
                    required
                    disabled={couponModalMode === 'view'}
                    placeholder={coupType === 'percent' ? 'e.g., 10' : 'e.g., 500'}
                    value={coupValue}
                    onChange={e => setCoupValue(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Minimum Subtotal (₹)</label>
                  <input
                    type="number"
                    disabled={couponModalMode === 'view'}
                    placeholder="e.g., 3000"
                    value={coupMinSubtotal}
                    onChange={e => setCoupMinSubtotal(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Max Discount Cap (₹)</label>
                  <input
                    type="number"
                    disabled={couponModalMode === 'view'}
                    placeholder="e.g., 1000 (only for % type)"
                    value={coupMaxDiscount}
                    onChange={e => setCoupMaxDiscount(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Expiry Date</label>
                  <input
                    type="date"
                    disabled={couponModalMode === 'view'}
                    value={coupExpiryDate}
                    onChange={e => setCoupExpiryDate(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Usage Limit</label>
                  <input
                    type="number"
                    disabled={couponModalMode === 'view'}
                    placeholder="e.g., 100 (leave blank for unlimited)"
                    value={coupUsageLimit}
                    onChange={e => setCoupUsageLimit(e.target.value)}
                    style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              {couponModalMode === 'view' && editingCoupon && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: '#F5F5F5', padding: '0.5rem', borderRadius: '2px' }}>
                  <div>
                    <label style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block' }}>Times Used</label>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0A234D' }}>{editingCoupon.usedCount || 0} times</span>
                  </div>
                  <div>
                    <label style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block' }}>Campaign Status</label>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: editingCoupon.isActive ? '#16a34a' : '#dc2626' }}>{editingCoupon.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#666666', display: 'block', marginBottom: '4px' }}>Campaign Description *</label>
                <input
                  type="text"
                  required
                  disabled={couponModalMode === 'view'}
                  placeholder="e.g., 10% off your order"
                  value={coupDesc}
                  onChange={e => setCoupDesc(e.target.value)}
                  style={{ width: '100%', background: 'rgba(245, 245, 245,0.4)', border: '1px solid #EAEAEA', borderRadius: '2px', padding: '8px 10px', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#D4A23A'} onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
              </div>

              {couponModalMode !== 'view' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0.5rem 0' }}>
                  <input
                    type="checkbox"
                    id="coup-is-active"
                    checked={coupIsActive}
                    onChange={e => setCoupIsActive(e.target.checked)}
                    style={{ accentColor: '#D4A23A', cursor: 'pointer', width: '14px', height: '14px' }}
                  />
                  <label htmlFor="coup-is-active" style={{ fontSize: '11px', fontWeight: 700, color: '#666666', cursor: 'pointer' }}>Set Coupon to Active</label>
                </div>
              )}

              {couponModalMode !== 'view' ? (
                <button type="submit" style={{ background: '#D4A23A', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#A67C24'} onMouseLeave={e => e.currentTarget.style.background = '#D4A23A'}>
                  {couponModalMode === 'add' ? 'Create Coupon Campaign' : 'Save Coupon Changes'}
                </button>
              ) : (
                <button type="button" onClick={() => { setCouponModalMode('edit'); }} style={{ background: '#0A234D', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', borderRadius: '2px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}>
                  Edit Campaign Settings
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ── Responsive CSS via style tag ── */}
      <style>{`
        .admin-sidebar-desktop { display: flex !important; }
        .admin-sidebar-mobile { display: flex !important; }
        .admin-hamburger { display: none !important; }
        .admin-collapse-btn { display: flex !important; }
        .admin-desktop-table { display: block !important; }
        .admin-mobile-cards { display: none !important; }
        .admin-topbar-search { display: flex !important; }
        .admin-user-label { display: flex !important; }

        @media (max-width: 1023px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-hamburger { display: flex !important; }
          .admin-collapse-btn { display: none !important; }
          .admin-user-label { display: none !important; }
        }
        @media (max-width: 640px) {
          .admin-topbar-search { display: none !important; }
          .admin-desktop-table { display: none !important; }
          .admin-mobile-cards { display: flex !important; flex-direction: column; gap: 0.6rem; }
          .admin-mobile-cards[style*="grid"] { display: grid !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .admin-desktop-table { display: block !important; }
          .admin-mobile-cards { display: none !important; }
        }

        .stat-card {
          background: #fff;
          border: 1px solid #EAEAEA;
          border-radius: 4px;
          padding: 1.1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .stat-card.gold { border-left: 3px solid #D4A23A; }
        .stat-card.blue { border-left: 3px solid #3B82F6; }
        .stat-card.green { border-left: 3px solid #22C55E; }
        .stat-card.red { border-left: 3px solid #EF4444; }

        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-gold { background: #D4A23A; color: #fff; }
        .btn-gold:hover { background: #A67C24; }
        .btn-outline { background: transparent; color: #04152F; border: 1.5px solid #EAEAEA; }
        .btn-outline:hover { border-color: #D4A23A; color: #D4A23A; }
        .btn-sm { padding: 6px 14px; font-size: 10px; }

        .status-badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 9px; font-weight: 700; text-transform: uppercase; }
        .status-active { background: #f0fdf4; color: #16a34a; }
        .status-inactive { background: #fef2f2; color: #dc2626; }
        .status-pending { background: #fefce8; color: #ca8a04; }
      `}</style>
    </div>
  );
}
