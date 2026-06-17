import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useToast } from '../context/ToastContext';
import { getImageUrl } from '../constants/storeData';
import {
  User,
  Package,
  Home as HomeIcon,
  Settings,
  LogOut,
  Mail,
  Calendar,
  Phone,
  Edit2,
  Trash2,
  Star,
  Sparkles,
  Award,
  ShoppingBag,
  Plus,
  Save,
  X,
  Loader2,
  MapPin,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Account() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || (location.state && location.state.from) || null;

  // Active User Session Initialization
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('buxaa-user');
    return saved ? JSON.parse(saved) : null;
  });

  // Tab & Loading States
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [activeProfileTab, setActiveProfileTab] = useState(() => {
    return localStorage.getItem('buxaa-profile-active-tab') || 'overview';
  }); // 'overview', 'orders', 'addresses', 'details'
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);

  // Register Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', color: '' });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showRegisterOtp, setShowRegisterOtp] = useState(false);
  const [registerOtp, setRegisterOtp] = useState('');

  // Profile Dashboard Editing States
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('01149409211');

  // Shipping Address States
  const [street, setStreet] = useState('105, Crystal Tower, Marine Drive');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [zip, setZip] = useState('400002');
  const [country, setCountry] = useState('India');

  // Dynamic Address CRUD States
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressMode, setAddressMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingAddress, setEditingAddress] = useState(null);

  // Address CRUD Form States
  const [addrFirstName, setAddrFirstName] = useState('');
  const [addrLastName, setAddrLastName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // Sync activeProfileTab to localStorage for refresh persistence
  useEffect(() => {
    localStorage.setItem('buxaa-profile-active-tab', activeProfileTab);
  }, [activeProfileTab]);

  // Dynamic user data syncing
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfilePhone(user.phone || '');

      // Fetch Scent Orders for this customer dynamically via email filter
      setOrdersLoading(true);
      fetch(`/api/orders?email=${encodeURIComponent(user.email)}&customerId=${user.id || ''}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setOrders(data);
          }
        })
        .catch(err => console.error('Error fetching orders:', err))
        .finally(() => setOrdersLoading(false));

      // Fetch Saved Addresses dynamically
      setAddressesLoading(true);
      fetch(`/api/customers/addresses?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.addresses)) {
            setAddresses(data.addresses);
          }
        })
        .catch(err => console.error('Error fetching addresses:', err))
        .finally(() => setAddressesLoading(false));
    }
  }, [user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: `Successfully logged in as ${data.user.name}`,
          confirmButtonColor: '#D4A23A',
          background: '#FFFFFF',
          color: '#04152F',
          timer: 2000,
          showConfirmButton: false
        });

        if (data.user.role === 'admin') {
          localStorage.setItem('buxaa-admin-token', data.token);
          // Redirect admin instantly without setting local user session
          navigate('/admin');
          return;
        }

        const session = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role
        };

        // Save session matching standard logic
        localStorage.setItem('buxaa-user', JSON.stringify(session));
        window.dispatchEvent(new Event('auth-change'));

        setUser(session); // Set state to switch views instantly

        setTimeout(() => {
          if (redirectPath) {
            navigate(redirectPath);
          }
        }, 1500);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid email or password.',
          confirmButtonColor: '#04152F',
          background: '#FFFFFF',
          color: '#04152F'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Server error during sign-in. Please try again.',
        confirmButtonColor: '#04152F',
        background: '#FFFFFF',
        color: '#04152F'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please enter your email address.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }

    setLoading(true);

    if (forgotStep === 1) {
      try {
        const res = await fetch('/api/auth/forgot-password/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.tempPassDev) {
            setForgotOtp(data.tempPassDev);
            Swal.fire({
              icon: 'success',
              title: 'OTP Sent (Dev Mode)',
              text: `A password reset OTP has been sent to your email address. (Local Dev OTP: ${data.tempPassDev})`,
              confirmButtonColor: '#D4A23A',
              background: '#FFFFFF',
              color: '#04152F'
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'OTP Sent',
              text: 'A password reset OTP has been sent to your email address.',
              confirmButtonColor: '#D4A23A',
              background: '#FFFFFF',
              color: '#04152F',
              timer: 2500,
              showConfirmButton: false
            });
          }
          setForgotStep(2);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: data.message || 'Failed to send verification OTP.',
            confirmButtonColor: '#04152F',
            background: '#FFFFFF',
            color: '#04152F'
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Server error. Please try again later.',
          confirmButtonColor: '#04152F',
          background: '#FFFFFF',
          color: '#04152F'
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    // Step 2 Logic
    if (!forgotOtp) {
      setLoading(false);
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please enter the verification OTP.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }
    if (forgotNewPassword.length < 8) {
      setLoading(false);
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'New password must be at least 8 characters.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setLoading(false);
      Swal.fire({
        icon: 'warning',
        title: 'Passwords Mismatch',
        text: 'New password and confirmation password do not match.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          otp: forgotOtp,
          newPassword: forgotNewPassword
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password reset successfully! You can now log in.',
          confirmButtonColor: '#D4A23A',
          background: '#FFFFFF',
          color: '#04152F',
          timer: 3000,
          showConfirmButton: false
        });

        // Pre-fill the login email and switch back to sign-in
        setLoginEmail(forgotEmail);
        setShowForgotPassword(false);
        setForgotStep(1);
        setForgotOtp('');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Reset Failed',
          text: data.message || 'Failed to reset password.',
          confirmButtonColor: '#04152F',
          background: '#FFFFFF',
          color: '#04152F'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Server error. Please try again.',
        confirmButtonColor: '#04152F',
        background: '#FFFFFF',
        color: '#04152F'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerEmail || !firstName || !registerPassword) return;
    if (!agreeTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Agreement Required',
        text: 'Please agree to the Terms of Service and Privacy Policy.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }
    if (phone && phone.length !== 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Mobile number must be exactly 10 digits.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      return;
    }

    setLoading(true);

    if (!showRegisterOtp) {
      // Step 1: Request OTP
      const payload = {
        firstName,
        lastName,
        email: registerEmail,
        phone,
        password: registerPassword,
        city: 'Mumbai'
      };

      try {
        const res = await fetch('/api/customers/send-signup-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok && data.success) {
          if (data.tempPassDev) {
            setRegisterOtp(data.tempPassDev);
            Swal.fire({
              icon: 'info',
              title: 'Verification Code Sent (Dev Mode)',
              text: `A 6-digit verification code has been sent to your email address. (Local Dev OTP: ${data.tempPassDev})`,
              confirmButtonColor: '#D4A23A',
              background: '#FFFFFF',
              color: '#04152F'
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Verification Code Sent',
              text: 'A 6-digit verification code has been sent to your email address.',
              confirmButtonColor: '#D4A23A',
              background: '#FFFFFF',
              color: '#04152F',
              timer: 3000,
              showConfirmButton: false
            });
          }
          setShowRegisterOtp(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: data.message || 'Email already exists or registration failed.',
            confirmButtonColor: '#04152F',
            background: '#FFFFFF',
            color: '#04152F'
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Server error requesting verification OTP.',
          confirmButtonColor: '#04152F',
          background: '#FFFFFF',
          color: '#04152F'
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    // Step 2: Verify OTP
    if (!registerOtp) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please enter the verification code.',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/customers/verify-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerEmail,
          otp: registerOtp
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Account Verified!',
          text: `Welcome to BUXAA, ${firstName}! Your account was created successfully.`,
          confirmButtonColor: '#D4A23A',
          background: '#FFFFFF',
          color: '#04152F',
          timer: 3000,
          showConfirmButton: false
        });

        // Automatically log them in for a premium user experience
        try {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: registerEmail, password: registerPassword })
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.success) {
            const session = {
              id: loginData.user.id,
              email: loginData.user.email,
              name: loginData.user.name,
              role: loginData.user.role
            };
            localStorage.setItem('buxaa-user', JSON.stringify(session));
            window.dispatchEvent(new Event('auth-change'));
            setUser(session);
            if (redirectPath) {
              navigate(redirectPath);
            }
          } else {
            setLoginEmail(registerEmail);
            setActiveTab('login');
          }
        } catch (loginErr) {
          setLoginEmail(registerEmail);
          setActiveTab('login');
        }

        // Clear registration form
        setFirstName('');
        setLastName('');
        setRegisterEmail('');
        setPhone('');
        setRegisterPassword('');
        setAgreeTerms(false);
        setShowRegisterOtp(false);
        setRegisterOtp('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: data.message || 'Invalid or expired OTP code.',
          confirmButtonColor: '#04152F',
          background: '#FFFFFF',
          color: '#04152F'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Verification Error',
        text: 'Server error verifying OTP. Please try again.',
        confirmButtonColor: '#04152F',
        background: '#FFFFFF',
        color: '#04152F'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialMock = (platform) => {
    Swal.fire({
      title: 'Connecting...',
      text: `Connecting securely to ${platform}`,
      icon: 'info',
      showConfirmButton: false,
      timer: 1200,
      background: '#FFFFFF',
      color: '#04152F'
    });
    setLoading(true);
    setTimeout(() => {
      const session = { name: 'Priya Sharma', email: 'priya@gmail.com', role: 'customer' };
      localStorage.setItem('buxaa-user', JSON.stringify(session));
      window.dispatchEvent(new Event('auth-change'));
      setUser(session);
      Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'Welcome back to BUXAA!',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F',
        timer: 1500,
        showConfirmButton: false
      });
      setLoading(false);
      if (redirectPath) {
        navigate(redirectPath);
      }
    }, 1200);
  };

  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength({ text: '', color: '' });
      return;
    }
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', '#EF4444', '#EA580C', '#3B82F6', '#22C55E'];
    setPasswordStrength({ text: labels[strength], color: colors[strength] });
  };

  const handleLogout = () => {
    localStorage.removeItem('buxaa-user');
    localStorage.removeItem('buxaa-admin-token');
    localStorage.removeItem('buxaa-profile-active-tab');
    window.dispatchEvent(new Event('auth-change'));
    setUser(null);
    showToast('Logged out successfully. Visit us again!', 'success');
    navigate('/');
  };

  // Address CRUD API handlers
  const resetAddressForm = () => {
    setAddrFirstName('');
    setAddrLastName('');
    setAddrPhone('');
    setAddr1('');
    setAddr2('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
    setAddrIsDefault(false);
    setEditingAddress(null);
  };

  const startEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddrFirstName(addr.firstName || '');
    setAddrLastName(addr.lastName || '');
    setAddrPhone(addr.phone || '');
    setAddr1(addr.address1 || '');
    setAddr2(addr.address2 || '');
    setAddrCity(addr.city || '');
    setAddrState(addr.state || '');
    setAddrPincode(addr.pincode || '');
    setAddrIsDefault(addr.isDefault || false);
    setAddressMode('edit');
  };

  const startAddAddress = () => {
    resetAddressForm();
    setAddressMode('add');
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (addrPhone.length !== 10) {
      showToast('Contact phone number must be exactly 10 digits.', 'warning');
      return;
    }
    if (addrPincode.length !== 6) {
      showToast('PIN code must be exactly 6 digits.', 'warning');
      return;
    }

    setLoading(true);
    const addressPayload = {
      firstName: addrFirstName,
      lastName: addrLastName,
      phone: addrPhone,
      address1: addr1,
      address2: addr2,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      isDefault: addrIsDefault
    };

    try {
      let res;
      if (addressMode === 'add') {
        res = await fetch('/api/customers/addresses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, address: addressPayload })
        });
      } else {
        res = await fetch('/api/customers/addresses/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, addressId: editingAddress.id, updatedFields: addressPayload })
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses);
        showToast(addressMode === 'add' ? 'Address added successfully!' : 'Address updated successfully!', 'success');
        resetAddressForm();
        setAddressMode('list');
      } else {
        showToast(data.message || 'Error saving address.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Server error during address save.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressDelete = async (addressId) => {
    if (!user || !user.email) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this address?',
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
      const res = await fetch('/api/customers/addresses/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, addressId })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses);
        showToast('Address deleted successfully!', 'success');
      } else {
        showToast(data.message || 'Error deleting address.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Server error deleting address.', 'error');
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    if (!user || !user.email) return;

    try {
      const res = await fetch('/api/customers/addresses/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, addressId, updatedFields: { isDefault: true } })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAddresses(data.addresses);
        showToast('Default address updated!', 'success');
      } else {
        showToast(data.message || 'Error updating default address.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Server error updating default address.', 'error');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (profilePhone && profilePhone.length !== 10) {
      showToast('Mobile number must be exactly 10 digits.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/customers/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: profileName,
          phone: profilePhone
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Profile details updated successfully!', 'success');

        // Update user session in localStorage
        const updatedSession = {
          ...user,
          name: data.customer.name,
          phone: data.customer.phone
        };
        localStorage.setItem('buxaa-user', JSON.stringify(updatedSession));
        window.dispatchEvent(new Event('auth-change'));
        setUser(updatedSession); // React state update trigger
      } else {
        showToast(data.message || 'Error updating profile.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Server error during profile update.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── RENDER 1: Dynamic Logged-In Profile Dashboard ──
  if (user) {
    const latestOrder = orders.length > 0 ? [...orders].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))[0] : null;
    const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
    const userPhone = user.phone || defaultAddress?.phone || 'Not Provided';

    return (
      <div className="account-dashboard-wrapper" style={{ minHeight: '80vh', background: 'var(--ivory)', padding: '4rem 1.5rem' }}>
        <Helmet>
          <title>My Account | BUXAA</title>
          <meta name="description" content="Access your BUXAA profile, track purchase history, and manage shipping addresses." />
        </Helmet>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>

          {/* Dashboard Header Card */}
          <div className="bg-[#0A234D] text-[#F5F5F5] p-8 rounded-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#EAEAEA]/15 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#D4A23A] text-[#FFFFFF] flex items-center justify-center font-serif text-2xl font-bold border border-[#F5F5F5]/10 shadow-sm uppercase">
                {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <h2 className="font-serif text-2xl font-bold tracking-wide" style={{ color: '#E3B85A' }}>Hello, {user.name}!</h2>
                {/* <p className="text-xs mt-1 font-semibold tracking-wider uppercase flex items-center gap-1.5" style={{ color: '#999999' }}>
                  <Sparkles size={12} style={{ color: '#E3B85A' }} /> VIP Gold Elite Club Member
                </p> */}
              </div>
            </div>
            <div className="text-left md:text-right font-sans text-xs font-semibold tracking-wide flex flex-col gap-1.5">
              <p className="flex items-center gap-1.5 justify-start md:justify-end text-[#F5F5F5]" style={{ color: '#F5F5F5' }}>
                <Mail size={12} style={{ color: '#E3B85A' }} /> {user.email}
              </p>
              <p className="flex items-center gap-1.5 justify-start md:justify-end text-[#999999]" style={{ color: '#999999' }}>
                <Calendar size={12} style={{ color: '#E3B85A' }} /> Member Since: June 2026
              </p>
            </div>
          </div>

          <div className="dashboard-grid">

            {/* Left Sidebar Navigation */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="dashboard-sidebar">
              {[
                { id: 'overview', label: 'Profile Overview', icon: User },
                { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
                { id: 'addresses', label: 'Saved Addresses', icon: HomeIcon },
                { id: 'details', label: 'Account Details', icon: Settings }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProfileTab(tab.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      textAlign: 'left', padding: '0.85rem 1.25rem', border: '1px solid var(--border)',
                      borderRadius: '2px', background: activeProfileTab === tab.id ? 'var(--gold-pale)' : 'var(--white)',
                      color: activeProfileTab === tab.id ? 'var(--gold-dark)' : 'var(--text-dark)',
                      fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'var(--transition)',
                      borderLeft: activeProfileTab === tab.id ? '4px solid var(--gold)' : '1px solid var(--border)'
                    }}
                    className="dashboard-tab-btn"
                  >
                    <IconComponent size={16} strokeWidth={2} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  textAlign: 'left', padding: '0.85rem 1.25rem', border: '1px solid #FCA5A5',
                  borderRadius: '2px', background: '#FEF2F2',
                  color: '#DC2626', fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'var(--transition)', marginTop: '1.5rem'
                }}
                className="dashboard-logout-btn"
              >
                <LogOut size={16} strokeWidth={2} />
                <span>Sign Out</span>
              </button>
            </aside>

            {/* Right Panel Content */}
            <main className="bg-white border border-[var(--border)] p-8 rounded-sm shadow-sm min-h-[400px]" style={{ textAlign: 'left' }}>

              {/* Tab 1: Overview */}
              {activeProfileTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                  {/* Top Welcome Title */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[var(--text-dark)] border-b border-[var(--border)] pb-3 mb-2">Profile Overview</h3>
                    <p className="text-xs text-[var(--text-light)]">
                      Welcome back! Manage your profile, track orders, save addresses, and access exclusive member benefits.
                    </p>
                  </div>

                  {/* 2-Column Responsive Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column: Account Details & Default Address */}
                    <div className="flex flex-col gap-6">

                      {/* Card 1: Personal Details */}
                      <div className="border border-[var(--border)] p-6 rounded-sm bg-[#FFFFFF] shadow-xs">
                        <div className="flex items-center gap-2.5 border-b border-[var(--border)] pb-3 mb-4">
                          <User size={18} className="text-[var(--gold)]" />
                          <h4 className="font-serif text-md font-bold text-[var(--text-dark)] m-0 uppercase tracking-wider">Personal Profile</h4>
                        </div>
                        <div className="flex flex-col gap-3 text-xs">
                          <div className="flex justify-between">
                            <span className="font-bold text-[var(--text-light)]">Full Name:</span>
                            <span className="font-semibold text-[var(--text-dark)]">{user.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-[var(--text-light)]">Email Address:</span>
                            <span className="font-semibold text-[var(--text-dark)]">{user.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-[var(--text-light)]">Contact Phone:</span>
                            <span className="font-semibold text-[var(--text-dark)]">{userPhone}</span>
                          </div>
                          <div className="flex justify-between border-t border-[var(--border)] pt-3 mt-1">
                            <span className="font-bold text-[var(--text-light)]">Security Status:</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Protected
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveProfileTab('details')}
                          className="w-100 text-center font-bold text-[10px] tracking-widest uppercase text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors duration-200 mt-5 border-t border-[var(--border)] pt-3 block w-full bg-transparent cursor-pointer"
                        >
                          Edit Profile Details →
                        </button>
                      </div>

                      {/* Card 2: Default Address */}
                      <div className="border border-[var(--border)] p-6 rounded-sm bg-[#FFFFFF] shadow-xs">
                        <div className="flex items-center gap-2.5 border-b border-[var(--border)] pb-3 mb-4">
                          <HomeIcon size={18} className="text-[var(--gold)]" />
                          <h4 className="font-serif text-md font-bold text-[var(--text-dark)] m-0 uppercase tracking-wider">Primary Delivery Address</h4>
                        </div>

                        {defaultAddress ? (
                          <div className="text-xs">
                            <h5 className="font-bold text-[var(--text-dark)] mb-1 uppercase tracking-wide">
                              {defaultAddress.firstName} {defaultAddress.lastName}
                            </h5>
                            <p className="text-[var(--text-mid)] leading-relaxed mb-2">
                              {defaultAddress.address1}
                              {defaultAddress.address2 && <><br />{defaultAddress.address2}</>}
                              <br />
                              {defaultAddress.city}, {defaultAddress.state} - <strong>{defaultAddress.pincode}</strong>
                            </p>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--gold-dark)] bg-[var(--gold-pale)] px-2 py-0.5 rounded-sm">
                              Primary Shipping
                            </span>
                          </div>
                        ) : (
                          <div className="text-xs text-[var(--text-light)] py-2 text-center">
                            No saved addresses found. Add a delivery location to enable fast, single-click checkout.
                          </div>
                        )}

                        <button
                          onClick={() => setActiveProfileTab('addresses')}
                          className="w-100 text-center font-bold text-[10px] tracking-widest uppercase text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors duration-200 mt-5 border-t border-[var(--border)] pt-3 block w-full bg-transparent cursor-pointer"
                        >
                          Manage Saved Addresses →
                        </button>
                      </div>

                    </div>

                    {/* Right Column: Latest Purchase & VIP BUXAA Club benefits */}
                    <div className="flex flex-col gap-6">

                      {/* Card 3: Latest Purchase */}
                      <div className="border border-[var(--border)] p-6 rounded-sm bg-[#FFFFFF] shadow-xs">
                        <div className="flex items-center gap-2.5 border-b border-[var(--border)] pb-3 mb-4">
                          <Package size={18} className="text-[var(--gold)]" />
                          <h4 className="font-serif text-md font-bold text-[var(--text-dark)] m-0 uppercase tracking-wider">Latest Purchase</h4>
                        </div>

                        {latestOrder ? (
                          <div className="text-xs flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[var(--text-dark)] uppercase">Order {latestOrder.id}</span>
                              <span style={{
                                padding: '0.15rem 0.5rem', fontSize: '8px', fontWeight: 700,
                                textTransform: 'uppercase', borderRadius: '2px',
                                background: ['delivered', 'completed', 'complete'].includes((latestOrder.status || '').toLowerCase()) ? '#D1FAE5' : '#FEF3C7',
                                color: ['delivered', 'completed', 'complete'].includes((latestOrder.status || '').toLowerCase()) ? '#065F46' : '#92400E'
                              }}>
                                {latestOrder.status || 'Processing'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--text-light)]">Date Purchased:</span>
                              <span className="font-semibold text-[var(--text-dark)]">
                                {latestOrder.createdAt ? new Date(latestOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : latestOrder.date}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--text-light)]">Item Count:</span>
                              <span className="font-semibold text-[var(--text-dark)]">{latestOrder.items} Items</span>
                            </div>
                            <div className="flex justify-between border-t border-[var(--border)] pt-2.5 mt-0.5">
                              <span className="text-[var(--text-light)] font-bold">Total Bill:</span>
                              <span className="font-bold text-[var(--gold-dark)]">₹{latestOrder.total.toLocaleString('en-IN')}</span>
                            </div>
                            <Link
                              to={`/order-confirm?orderId=${latestOrder.id}`}
                              className="btn btn-gold w-full text-center mt-3 text-[10px] tracking-widest uppercase font-bold py-2.5 flex items-center justify-center gap-1.5"
                            >
                              <MapPin size={11} /> Track Current Order Status
                            </Link>
                          </div>
                        ) : (
                          <div className="text-xs text-[var(--text-light)] py-4 text-center flex flex-col items-center gap-3">
                            <span>You haven't ordered any premium bags yet.</span>
                            <Link to="/shop" className="btn btn-gold px-5 py-2.5 font-bold tracking-wider text-[10px] uppercase">
                              Start Shopping →
                            </Link>
                          </div>
                        )}

                        {latestOrder && (
                          <button
                            onClick={() => setActiveProfileTab('orders')}
                            className="w-100 text-center font-bold text-[10px] tracking-widest uppercase text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors duration-200 mt-4 border-t border-[var(--border)] pt-3 block w-full bg-transparent cursor-pointer"
                          >
                            View Entire Purchase History →
                          </button>
                        )}
                      </div>

                      {/* Card 4: VIP BUXAA Club benefits */}
                      {/* <div className="border border-[var(--border)] p-6 rounded-sm bg-gradient-to-br from-[#0A234D] to-[#2E200F] text-[#F5F5F5] relative overflow-hidden shadow-xs">
                
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--gold)] rounded-full filter blur-2xl opacity-15 pointer-events-none"></div>

                        <div className="flex items-center gap-2.5 border-b border-[#EAEAEA]/15 pb-3 mb-4">
                          <Award size={18} className="text-[var(--gold)]" />
                          <h4 className="font-serif text-md font-bold text-[#E3B85A] m-0 uppercase tracking-wider">VIP Membership Perks</h4>
                        </div>
                        <div className="flex flex-col gap-3 text-xs">
                          <div className="flex gap-2.5 items-start">
                            <Sparkles size={14} className="text-[#E3B85A] shrink-0 mt-0.5" />
                            <p className="m-0 leading-relaxed text-[#999999] font-sans" style={{ color: '#999999' }}>
                              <strong className="text-[#F5F5F5]">10% VIP Off Auto-applied</strong>: As a Gold Elite member, receive an additional 10% discount automatically active at checkout.
                            </p>
                          </div>
                          <div className="flex gap-2.5 items-start border-t border-[#EAEAEA]/10 pt-3">
                            <Sparkles size={14} className="text-[#E3B85A] shrink-0 mt-0.5" />
                            <p className="m-0 leading-relaxed text-[#999999] font-sans" style={{ color: '#999999' }}>
                              <strong className="text-[#F5F5F5]">Complimentary Express Delivery</strong>: Enjoy free shipping on all orders with no minimum spending required.
                            </p>
                          </div>
                          <div className="flex gap-2.5 items-start border-t border-[#EAEAEA]/10 pt-3">
                            <Sparkles size={14} className="text-[#E3B85A] shrink-0 mt-0.5" />
                            <p className="m-0 leading-relaxed text-[#999999] font-sans" style={{ color: '#999999' }}>
                              <strong className="text-[#F5F5F5]">Early Private Vault Access</strong>: Receive invitations to pre-order limited edition small-batch collections before public release.
                            </p>
                          </div>
                        </div>
                      </div> */}

                    </div>

                  </div>

                </div>
              )}

              {/* Tab 2: Orders */}
              {activeProfileTab === 'orders' && (
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-dark)] border-b border-[var(--border)] pb-3 mb-6">Your Purchases</h3>

                  {ordersLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 700 }}>
                      <Loader2 className="animate-spin text-[var(--gold)] mr-2" size={18} /> Fetching Order History...
                    </div>
                  ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                      <ShoppingBag size={40} className="text-[var(--text-pale)] mb-3 mx-auto" />
                      <h4 className="font-serif text-lg font-bold text-[var(--text-dark)] mt-4">No Orders Yet</h4>
                      <p className="text-sm text-[var(--text-light)] mt-2 mb-6">You haven't purchased any BUXAA premium bags yet. Start exploring our exquisite curation!</p>
                      <Link to="/shop" className="btn btn-gold" style={{ padding: '0.75rem 2rem', display: 'inline-block' }}>Explore Shop →</Link>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }} className="orders-table">
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left', color: 'var(--text-dark)', fontWeight: 700 }}>
                            <th style={{ padding: '0.85rem' }}>Order ID</th>
                            <th style={{ padding: '0.85rem' }}>Date</th>
                            <th style={{ padding: '0.85rem' }}>Items</th>
                            <th style={{ padding: '0.85rem' }}>Total Price</th>
                            <th style={{ padding: '0.85rem' }}>Status</th>
                            <th style={{ padding: '0.85rem', textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-mid)' }}>
                              <td style={{ padding: '1rem 0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>{order.id}</td>
                              <td style={{ padding: '1rem 0.85rem' }}>
                                {order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric',
                                  hour: '2-digit', minute: '2-digit', hour12: true
                                }) : order.date}
                              </td>
                              <td style={{ padding: '1rem 0.85rem' }}>{order.items} Items</td>
                              <td style={{ padding: '1rem 0.85rem', fontWeight: 700, color: 'var(--gold-dark)' }}>₹{order.total.toLocaleString('en-IN')}</td>
                              <td style={{ padding: '1rem 0.85rem' }}>
                                <span style={{
                                  padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontWeight: 700,
                                  textTransform: 'uppercase', borderRadius: '3px',
                                  background: order.status === 'Delivered' ? '#D1FAE5' : '#FEF3C7',
                                  color: order.status === 'Delivered' ? '#065F46' : '#92400E'
                                }}>
                                  {order.status || 'Processing'}
                                </span>
                              </td>
                              <td style={{ padding: '1rem 0.85rem', textAlign: 'center' }}>
                                <Link to={`/order-confirm?orderId=${order.id}`} className="btn btn-gold" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', width: 'max-content', margin: '0 auto' }}>
                                  <MapPin size={11} /> Track Order
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Saved Addresses */}
              {activeProfileTab === 'addresses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'between', justifycontent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', pb: '0.75rem', paddingBottom: '0.75rem' }} className="flex justify-between items-center border-b pb-3 mb-2">
                    <h3 className="font-serif text-xl font-bold text-[var(--text-dark)] m-0">Saved Delivery Addresses</h3>
                    {addressMode === 'list' && (
                      <button
                        onClick={startAddAddress}
                        className="btn btn-gold"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '2px' }}
                      >
                        <span className="flex items-center gap-1.5"><Plus size={14} /> Add New Address</span>
                      </button>
                    )}
                  </div>

                  {/* LOADING STATE */}
                  {addressesLoading && addressMode === 'list' && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 700 }}>
                      <span className="flex items-center gap-2"><Loader2 className="animate-spin text-[var(--gold)]" size={16} /> Loading your addresses...</span>
                    </div>
                  )}

                  {/* LIST MODE */}
                  {addressMode === 'list' && !addressesLoading && (
                    <>
                      {addresses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3.5rem 1rem', border: '1px dashed var(--border)', borderRadius: '2px', backgroundColor: '#FFFFFF' }}>
                          <HomeIcon size={40} className="text-[var(--text-pale)] mb-3 mx-auto" />
                          <h4 className="font-serif text-lg font-bold text-[var(--text-dark)] mt-4">No Saved Addresses</h4>
                          <p className="text-sm text-[var(--text-mid)] mt-2 mb-6">You don't have any saved delivery addresses yet. Add one to enable express checkout.</p>
                          <button
                            onClick={startAddAddress}
                            className="btn btn-gold"
                            style={{ padding: '0.75rem 2rem' }}
                          >
                            + Add Your First Address
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                          {addresses.map((addr) => (
                            <div
                              key={addr.id}
                              style={{
                                border: addr.isDefault ? '2px solid var(--gold)' : '1px solid var(--border)',
                                background: addr.isDefault ? '#FFFFFF' : 'var(--white)',
                                padding: '1.5rem',
                                borderRadius: '2px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                position: 'relative',
                                transition: 'var(--transition)'
                              }}
                              className="address-card"
                            >
                              {addr.isDefault && (
                                <span style={{
                                  position: 'absolute',
                                  top: '1rem',
                                  right: '1rem',
                                  background: 'var(--gold-dark)',
                                  color: 'var(--white)',
                                  fontSize: '9px',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  padding: '0.2rem 0.5rem',
                                  letterSpacing: '0.08em',
                                  borderRadius: '2px'
                                }}>
                                  Primary Shipping
                                </span>
                              )}

                              <div style={{ textAlign: 'left' }}>
                                <h4 className="font-serif text-md font-bold text-[var(--text-dark)] pr-20 uppercase tracking-wide">
                                  {addr.firstName} {addr.lastName}
                                </h4>
                                <p className="text-xs text-[var(--text-mid)] font-semibold mt-1 flex items-center gap-1.5"><Phone size={12} className="text-[var(--gold)]" /> {addr.phone}</p>
                                <div style={{ borderTop: '1px solid var(--border)', margin: '0.75rem 0', opacity: 0.6 }}></div>
                                <p className="text-xs leading-relaxed text-[var(--text-mid)]">
                                  {addr.address1}
                                  {addr.address2 && <><br />{addr.address2}</>}
                                  <br />
                                  {addr.city}, {addr.state} - <strong className="text-[var(--text-dark)]">{addr.pincode}</strong>
                                </p>
                              </div>

                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: 'auto' }}>
                                <button
                                  onClick={() => startEditAddress(addr)}
                                  style={{
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    border: '1px solid var(--border)',
                                    background: 'var(--white)',
                                    color: 'var(--text-mid)',
                                    cursor: 'pointer',
                                    borderRadius: '2px',
                                    transition: 'var(--transition)'
                                  }}
                                  className="hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
                                >
                                  <span className="flex items-center gap-1"><Edit2 size={11} /> Edit</span>
                                </button>
                                <button
                                  onClick={() => handleAddressDelete(addr.id)}
                                  style={{
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    border: '1px solid #FCA5A5',
                                    background: '#FEF2F2',
                                    color: '#DC2626',
                                    cursor: 'pointer',
                                    borderRadius: '2px',
                                    transition: 'var(--transition)'
                                  }}
                                >
                                  <span className="flex items-center gap-1"><Trash2 size={11} /> Delete</span>
                                </button>
                                {!addr.isDefault && (
                                  <button
                                    onClick={() => handleSetDefaultAddress(addr.id)}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      fontSize: '0.72rem',
                                      fontWeight: 700,
                                      border: '1px solid var(--gold-pale)',
                                      background: 'var(--gold-pale)',
                                      color: 'var(--gold-dark)',
                                      cursor: 'pointer',
                                      borderRadius: '2px',
                                      marginLeft: 'auto',
                                      transition: 'var(--transition)'
                                    }}
                                    className="hover:bg-[var(--gold)] hover:color-white"
                                  >
                                    <span className="flex items-center gap-1"><Star size={11} fill="currentColor" /> Set Default</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* ADD & EDIT MODES */}
                  {(addressMode === 'add' || addressMode === 'edit') && (
                    <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#FFFFFF', padding: '2rem', border: '1px solid var(--border)', borderRadius: '2px' }}>
                      <h4 className="font-serif text-lg font-bold text-[var(--text-dark)] border-b border-[var(--border)] pb-2 mb-2">
                        {addressMode === 'add' ? (
                          <span className="flex items-center gap-2"><Plus size={16} className="text-[var(--gold)]" /> Add New Delivery Location</span>
                        ) : (
                          <span className="flex items-center gap-2"><Edit2 size={16} className="text-[var(--gold)]" /> Update Saved Location</span>
                        )}
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>First Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            value={addrFirstName}
                            onChange={(e) => setAddrFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Last Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            value={addrLastName}
                            onChange={(e) => setAddrLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Contact Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter your phone number"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Street Address *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Flat/House No, Building name, Street address"
                          value={addr1}
                          onChange={(e) => setAddr1(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Apartment, Suite, Unit, etc. (Optional)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, suite, unit (optional)"
                          value={addr2}
                          onChange={(e) => setAddr2(e.target.value)}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>City *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your city"
                            value={addrCity}
                            onChange={(e) => setAddrCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>State *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your state"
                            value={addrState}
                            onChange={(e) => setAddrState(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ maxWidth: '50%' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Pincode / ZIP Code *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your PIN code"
                          value={addrPincode}
                          onChange={(e) => setAddrPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                          required
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                        <input
                          type="checkbox"
                          id="addr-default"
                          checked={addrIsDefault}
                          onChange={(e) => setAddrIsDefault(e.target.checked)}
                          style={{ accentColor: 'var(--gold)', cursor: 'pointer' }}
                        />
                        <label htmlFor="addr-default" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', cursor: 'pointer' }}>
                          Set as primary delivery address
                        </label>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                          type="submit"
                          className="btn btn-gold"
                          style={{ padding: '0.75rem 2rem' }}
                        >
                          {loading ? (
                            <span className="flex items-center gap-1.5"><Loader2 className="animate-spin" size={14} /> Saving...</span>
                          ) : (
                            <span className="flex items-center gap-1.5"><Save size={14} /> Save Location</span>
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-border"
                          onClick={() => {
                            resetAddressForm();
                            setAddressMode('list');
                          }}
                          style={{
                            padding: '0.75rem 2rem',
                            border: '1px solid var(--border)',
                            background: 'var(--white)',
                            color: 'var(--text-dark)',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Tab 4: Account Details */}
              {activeProfileTab === 'details' && (
                <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-dark)] border-b border-[var(--border)] pb-3 mb-4">Profile Details</h3>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      disabled
                      style={{ background: '#F5F5F5', color: 'var(--text-light)', cursor: 'not-allowed' }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-gold" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', marginTop: '1rem' }}>
                    {loading ? (
                      <span className="flex items-center gap-1.5"><Loader2 className="animate-spin" size={14} /> Updating...</span>
                    ) : (
                      'Update Profile →'
                    )}
                  </button>
                </form>
              )}

            </main>

          </div>
        </div>
      </div>
    );
  }

  // ── RENDER 2: Logged-Out Authentication Forms (Tabs) ──
  return (
    <div className="auth-wrapper">
      <Helmet>
        <title>Sign In / Register | BUXAA</title>
        <meta name="description" content="Access your BUXAA account or create a new profile to manage orders and track shipments." />
      </Helmet>

      {/* Left: Image Banner (Coco Chanel quote) */}
      <div className="auth-image">
        <img
          src={getImageUrl('images/profile.png')}
          alt="Premium BUXAA bag"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
        />
        <div className="auth-image-overlay" style={{ position: 'absolute', inset: 0, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(4, 21, 47,0.8) 0%, transparent 60%)' }}>
          <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '0.75rem', fontFamily: 'Playfair Display, serif' }}>Designed for Every Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>Thoughtfully crafted bags for work, travel, and everyday adventures. Built with premium materials, smart organization, and lasting durability.</p>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
            <div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--gold-light)', fontWeight: 700 }}>10,000+</span>
              <br />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Happy Customers</span>
            </div>
            <div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--gold-light)', fontWeight: 700 }}>100+</span>
              <br />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Corporate Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="auth-form-area">
        <div className="auth-card" style={{ width: '100%', maxWidth: '420px' }}>

          <div className="auth-logo" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link to="/" className="nav-logo" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <img src="/images/buxaa-logo.png?v=2" alt="Buxaa" className="auth-logo-img" />
            </Link>
          </div>

          {/* Toggle Tabs */}
          <div className="auth-tabs" style={{ display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: '2rem' }}>
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1, padding: '0.75rem', background: 'none', border: 'none',
                textAlign: 'center', fontSize: '0.85rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: activeTab === 'login' ? 'var(--gold-dark)' : 'var(--text-light)',
                borderBottom: activeTab === 'login' ? '3px solid var(--gold)' : '3px solid transparent',
                marginBottom: '-2px', cursor: 'pointer', transition: 'var(--transition)'
              }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              style={{
                flex: 1, padding: '0.75rem', background: 'none', border: 'none',
                textAlign: 'center', fontSize: '0.85rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: activeTab === 'register' ? 'var(--gold-dark)' : 'var(--text-light)',
                borderBottom: activeTab === 'register' ? '3px solid var(--gold)' : '3px solid transparent',
                marginBottom: '-2px', cursor: 'pointer', transition: 'var(--transition)'
              }}
            >
              Create Account
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === 'login' && !showForgotPassword && (
            <form onSubmit={handleLoginSubmit} id="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', cursor: 'pointer' }}
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0' }}>
                <label style={{ display: 'flex', alignParagraphs: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-mid)' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--gold)' }} /> Remember me
                </label>
                <button type="button" onClick={() => setShowForgotPassword(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.83rem', color: 'var(--gold-dark)', fontWeight: 700 }}>Forgot Password?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold btn-full"
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center"><Loader2 className="animate-spin" size={16} /> Signing in...</span>
                ) : (
                  'Sign In'
                )}
              </button>


              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '1.5rem' }}>
                Don't have an account? <span onClick={() => setActiveTab('register')} style={{ color: 'var(--gold-dark)', fontWeight: 700, cursor: 'pointer' }}>Create one →</span>
              </p>

              {/* <span className="text-[9px] text-[#666666]/75 text-center leading-relaxed block mt-2 font-semibold">
                Admin Credentials:<br />
                <span className="text-[#D4A23A]">admin@buxaabags.com</span> / <span className="text-[#D4A23A]">admin123</span>
              </span> */}
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {activeTab === 'login' && showForgotPassword && (
            <form onSubmit={handleForgotSubmit} id="forgot-password-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={forgotStep === 2}
                  required
                />
              </div>

              {forgotStep === 2 && (
                <>
                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>6-Digit OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the OTP from your email"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Min. 8 characters"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                        style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', cursor: 'pointer' }}
                      >
                        {showForgotNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-enter your new password"
                      value={forgotConfirmPassword}
                      onChange={(e) => setForgotConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold btn-full"
                style={{ cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem' }}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center"><Loader2 className="animate-spin" size={16} /> Processing...</span>
                ) : (
                  forgotStep === 1 ? 'Send OTP' : 'Reset Password'
                )}
              </button>

              <button type="button" onClick={() => { setShowForgotPassword(false); setForgotStep(1); setForgotOtp(''); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.83rem', color: 'var(--text-light)', fontWeight: 700, marginTop: '0.25rem' }}>Back to Login</button>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} id="register-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {showRegisterOtp ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)', padding: '1.25rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 600, lineHeight: '1.5' }}>
                    📩 We have sent a 6-digit verification code to <strong>{registerEmail}</strong>. Please check your inbox and enter the code below to complete your registration.
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.5rem' }}>Verification Code (OTP)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="••••••"
                      maxLength={6}
                      required
                      value={registerOtp}
                      onChange={(e) => setRegisterOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                      style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', padding: '0.75rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold btn-full"
                    style={{ cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center"><Loader2 className="animate-spin" size={16} /> Verifying OTP...</span>
                    ) : (
                      'Verify & Create Account'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setShowRegisterOtp(false); setRegisterOtp(''); }}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.83rem', color: 'var(--text-light)', fontWeight: 700, alignSelf: 'center', marginTop: '0.25rem' }}
                  >
                     Edit Registration Details
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter 10-digit phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Min. 8 characters"
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          checkPasswordStrength(e.target.value);
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', cursor: 'pointer' }}
                      >
                        {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {passwordStrength.text && (
                      <div id="password-strength" style={{ marginTop: '0.4rem', fontSize: '0.78rem', fontWeight: 700 }}>
                        <span style={{ color: passwordStrength.color }}>{passwordStrength.text} password</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', margin: '0.5rem 0' }}>
                    <input
                      type="checkbox"
                      id="agree-terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ accentColor: 'var(--gold)', marginTop: '4px' }}
                    />
                    <label htmlFor="agree-terms" style={{ fontSize: '0.83rem', color: 'var(--text-mid)', cursor: 'pointer', lineHeight: '1.5' }}>
                      I agree to BUXAA's <Link to="/terms-conditions" style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Terms of Service</Link> and <Link to="/privacy-policy" style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold btn-full"
                    style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center"><Loader2 className="animate-spin" size={16} /> Requesting OTP...</span>
                    ) : (
                      '🔒 Secure Registration'
                    )}
                  </button>
                </>
              )}


              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '1.5rem' }}>
                Already have an account? <span onClick={() => setActiveTab('login')} style={{ color: 'var(--gold-dark)', fontWeight: 700, cursor: 'pointer' }}>Sign in →</span>
              </p>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
