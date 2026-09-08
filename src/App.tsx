import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

// Primary Ecosystem Pages
import { HomePage } from './components/public/HomePage';
import { CustomerPortalPage } from './components/customer/CustomerPortalPage';
import { NotificationsCenterPage } from './components/customer/NotificationsCenterPage';
import { MyGarageView } from './components/garage/MyGarageView';
import { VehicleServiceHistoryPage } from './components/customer/VehicleServiceHistoryPage';
import { QuoteComparisonView } from './components/public/QuoteComparisonView';
import { RequestQuotePage } from './components/public/RequestQuotePage';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CategoriesGrid } from './components/public/CategoriesGrid';
import { ProviderDirectory } from './components/public/ProviderDirectory';
import { MockupsExplorer } from './components/mockups/MockupsExplorer';

// Dedicated New Pages Matching Mockup Designs
import { MarketplacePage } from './components/public/MarketplacePage';
import { ProductDetailPage } from './components/public/ProductDetailPage';
import { CartCheckoutPage } from './components/public/CartCheckoutPage';
import { TrackOrderPage } from './components/public/TrackOrderPage';
import { TrackBookingPage } from './components/public/TrackBookingPage';
import { BookServicePage } from './components/public/BookServicePage';
import { BookingConfirmedPage } from './components/public/BookingConfirmedPage';
import { FleetSolutionsPage } from './components/public/FleetSolutionsPage';
import { PricingPage } from './components/public/PricingPage';
import { AboutPage } from './components/public/AboutPage';
import { BecomeProviderPage } from './components/public/BecomeProviderPage';
import { HelpCenterPage } from './components/public/HelpCenterPage';
import { ContactPage } from './components/public/ContactPage';

// Modals
import { QuoteRequestModal } from './components/public/QuoteRequestModal';
import { QuickBookingModal } from './components/booking/QuickBookingModal';
import { QuickPartsCheckoutModal } from './components/marketplace/QuickPartsCheckoutModal';
import { EmergencySOSModal } from './components/emergency/EmergencySOSModal';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { ProviderDetailModal } from './components/public/ProviderDetailModal';
import { AuthModal } from './components/auth/AuthModal';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-900">
      {/* Global Header */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* 1. Public Home & Marketing */}
        {activeTab === 'home' && <HomePage />}

        {/* 2. Services Taxonomy Catalog */}
        {activeTab === 'services' && <CategoriesGrid />}

        {/* 3. Providers Directory & Map */}
        {activeTab === 'providers' && <ProviderDirectory />}

        {/* 4. Spare Parts Marketplace, Product & Cart (Image 4) */}
        {activeTab === 'marketplace' && <MarketplacePage />}
        {activeTab === 'product-detail' && <ProductDetailPage />}
        {activeTab === 'cart-checkout' && <CartCheckoutPage />}
        {activeTab === 'track-order' && <TrackOrderPage />}

        {/* 5. Booking Flow & Live GPS Tracking */}
        {(activeTab === 'bookings' || activeTab === 'track-booking') && <TrackBookingPage />}
        {activeTab === 'book-service' && <BookServicePage />}
        {activeTab === 'booking-confirmed' && <BookingConfirmedPage />}

        {/* 6. Quotes: Request a Quote (Image 5) & Compare Quotes (Image 3) */}
        {(activeTab === 'request-quote' || activeTab === 'quote-request') && <RequestQuotePage />}
        {activeTab === 'quotes' && <QuoteComparisonView />}

        {/* 7. My Garage & Customer Portal */}
        {activeTab === 'garage' && <MyGarageView />}
        {activeTab === 'customer' && <CustomerPortalPage />}
        {activeTab === 'notifications' && <NotificationsCenterPage />}
        {activeTab === 'vehicle-history' && <VehicleServiceHistoryPage />}

        {/* 8. Fleet Solutions & Pricing Plans */}
        {activeTab === 'fleet' && <FleetSolutionsPage />}
        {activeTab === 'pricing' && <PricingPage />}

        {/* 9. Resources: About, Become Provider, Help, Contact */}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'become-provider' && <BecomeProviderPage />}
        {activeTab === 'help' && <HelpCenterPage />}
        {activeTab === 'contact' && <ContactPage />}

        {/* 10. Workshop SaaS Portal (Work Orders, DVI, Technicians, Inventory) */}
        {(activeTab === 'workshop' || activeTab === 'provider-portal') && (
          <ProviderDashboard />
        )}

        {/* 11. Super Admin Portal (KPIs, KYC Verification, Branch Map) */}
        {activeTab === 'admin' && <AdminDashboard />}

        {/* 12. 54 UI Mockups Explorer */}
        {activeTab === 'mockups' && <MockupsExplorer />}

        {/* Fallback to HomePage if activeTab is not matched */}
        {![
          'home', 'services', 'providers', 'marketplace', 'product-detail', 'cart-checkout',
          'track-order', 'bookings', 'track-booking', 'book-service', 'booking-confirmed',
          'request-quote', 'quote-request', 'quotes', 'garage', 'customer', 'notifications',
          'vehicle-history', 'fleet', 'pricing', 'about', 'become-provider', 'help', 'contact',
          'workshop', 'provider-portal', 'admin', 'mockups'
        ].includes(activeTab) && <HomePage />}
      </main>

      {/* Global Modals */}
      <QuoteRequestModal />
      <QuickBookingModal />
      <QuickPartsCheckoutModal />
      <EmergencySOSModal />
      <AIAssistantModal />
      <ProviderDetailModal />
      <AuthModal />

      {/* Global Toast */}
      <Toast />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default AppContent;
