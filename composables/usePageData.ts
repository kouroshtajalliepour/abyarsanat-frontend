import { usePageStore } from "@/store/page";
import { storeToRefs } from "pinia";
import { useBlogStore } from "@/store/blog";
import { useProductStore } from "@/store/product";


export function usePageData (){
  // * composables
  const { t, locale, locales } = useI18n();
  const blogStore = useBlogStore();
  const productStore = useProductStore();
  const pageStore = usePageStore();
  const { info } = storeToRefs(pageStore);
  const route = useRoute()
  const img = useImage()
  const imageOptions = { 
    quality: 80,
    width: 1200, 
    height: 630,
    format:"webp",
    fit: 'contain'
  }
  const {
    getUrl
  } = useUrl()
  function tagSanitizer (tags:string) {
    if(!tags) return '';
    return tags.replace(/\s*-\s*/g, ', ');
  }


  async function getDefaultPageData() {

    let url = "";
    let pageComesFromApi = true;

    const { title: siteName } = locales.value.filter((l: any) => {
      return l.code == locale.value;
    })[0] as any;

    switch (route.path) {
      case "":
      case "/":
        url = "home";
        break;
      case "/about":
        url = "about";
        break;
      case "/faq":
        url = "faq";
        break;
      case "/terms":
        pageComesFromApi = false;
        url = "terms";
        break;
      case "/categories":
        pageComesFromApi = false;
        url = "categories";
      case "/payment/call-back":
        pageComesFromApi = false;
        url = "categories";
        break;

      default:
        break;
    }

    const { data: page }: any = await useAsyncData(() => {
      return pageStore.getData({
        url,
        query: "",
        lang: "fa",
        dataResult: "",
      });
    });

    const {
      public: { domain },
    } = useRuntimeConfig();

    const breadCrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("pages.seo.home.name"),
        item: domain,
      },
    ]

    
    const title = pageComesFromApi ? page.value.title : t(`pages.seo.${url}.title`);
   
    if (url != "home") {
      breadCrumbs.push({
        "@type": "ListItem",
        position: 2,
        name: t(`pages.seo.${url}.name`),
        item: `${domain}${route.path?.replace(/\/$/, "")}`,
      })
    }
    const description = pageComesFromApi
      ? page.value.description
      : t(`pages.seo.${url}.description`);
    const image_url =
      pageComesFromApi && page && page.value.image_url
        ? img(getUrl(page.value.image_url), imageOptions)
        : img("/images/logo.png", imageOptions);

    const script = [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebPage",
          name: title,
          url: `${domain}${route.path?.replace(/\/$/, "")}`,
          description: description,
        }),
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadCrumbs,
        }),
      }
      
    ] as any;

    if (url == "home") {
      script.push(
        ...[
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              alternateName: t("pages.seo.website.alternateName"),
              name: title,
              url: domain,
              inLanguage: locale.value,
              description: t("pages.seo.website.description"),
            }),
          },
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              name: siteName,
              logo: img("/images/logo.png", {width: 200, height: 200}),
              url: domain,
              description: t("pages.seo.website.description"),
              contactPoint: {
                "@type": "ContactPoint",
                telephone: info.value.contact_number,
                contactType: t("pages.seo.contactType.name"),
              },
              sameAs: [info.value.instagram],
            }),
          },
        ]
      );
    }

    useHead({
      title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: image_url,
        },
        {
          hid: "t-type",
          property: "twitter:cart",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image_url,
        },
        {
          hid: "canonical",
          name: "canonical",
          content: `${domain}${route.path?.replace(/\/$/, "")}`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: tagSanitizer(page.value.tags),
        },
      ],
      script: script,
    });
  };

  async function getBlogsPageData () {
    const { data } = await useAsyncData(() => {
      const query = {} as any;

      if (route.query.selectedBlogCategory) {
        query.blog_category_id = route.query.selectedBlogCategory;
      }

      return blogStore.getMultiData({
        lang: locale.value,
        dataResult: "result",
        dataCountResult: "totalCount",
        preDefined: {
          published: "1",
        },
        url: "/public/blog",
        pageNumber: route.query.pageNumber,
        pageSize: 20,
        query,
      });
    });

    const {
      public: { domain },
    } = useRuntimeConfig();

    const page = data;

    
    const title = page.value?.page.title;
    const breadCrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("pages.seo.home.name"),
        item: domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(`pages.seo.blogs.name`),
        item: `${domain}${route.path?.replace(/\/$/, "")}`,
      }
    ]
    const description = page.value?.page.description;
    const image_url =
      page && page.value?.page.image_url ? 
      img(getUrl(page.value?.page.image_url) , imageOptions): 
      img("/images/logo.png", imageOptions) ;

    useHead({
      title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: image_url,
        },
        {
          hid: "t-type",
          property: "twitter:cart",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image_url,
        },
        {
          hid: "canonical",
          name: "canonical",
          content: `${domain}${route.path?.replace(/\/$/, "")}`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: tagSanitizer(page.value?.page.tags),
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            name: title,
            description,
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadCrumbs,
          }),
        }
      ],
    });
  };

  async function getCartPageData () {

    const title = t(`pages.seo.cart.title`);
    const description = t(`pages.seo.cart.description`);
    const image_url = img("/images/logo.png", {width: 200, height: 200});

    useHead({
      title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: image_url,
        },
      ],
    });
  };

  async function getSingleBlogPageData () {
    if (!route.params.blogId) return;
  
    const { data } = (await useAsyncData(() => {
      return blogStore.getData({
        url: `/public/blog/${route.params.blogId}`,
        query: "",
        lang: "fa",
        dataResult: "",
      });
    })) as any;
  
    const {
      public: { domain },
    } = useRuntimeConfig();
  
    // const page = data;
  
    const title = data.value.title;
    const breadCrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("pages.seo.home.name"),
        item: domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(`pages.seo.blogs.name`),
        item: `${domain}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${domain}${route.path?.replace(/\/$/, "")}`,
      },
    ]
    const description = data.value.description;
    const image_url =
      data.value && data.value.image_url ? 
      img(getUrl(data.value.image_url), imageOptions) : 
      img("/images/logo.png" , imageOptions) ;

    
    const { title: siteName } = locales.value.filter((l: any) => {
      return l.code == locale.value;
    })[0] as any;
  
    const keywords =
      data.value.tags && data.value.tags.length
        ? data.value.tags.map((item: any) => item.name)
        : [];
  
    useHead({
      title: `${t("pages.seo.blogs.name")} | ${title}`,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: image_url,
        },
        {
          hid: "t-type",
          property: "twitter:cart",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image_url,
        },
        {
          hid: "canonical",
          name: "canonical",
          content: `${domain}${route.path?.replace(/\/$/, "")}`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: keywords ? keywords.join(", ") : "",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: title,
            description: description,
            url: "https://www.yourblog.com/",
            publisher: {
              "@type": "Organization",
              name: siteName,
              logo: img("/images/logo.png", {width: 200, height: 200}),
              url: domain,
              description: t("pages.seo.website.description"),
              contactPoint: {
                "@type": "ContactPoint",
                telephone: info.value.contact_number,
                contactType: t("pages.seo.contactType.name"),
              },
              sameAs: [info.value.instagram],
            },
            datePublished: data.value.created_at,
            keywords,
            image: {
              "@type": "ImageObject",
              url: image_url,
              width: 600,
              height: 600,
            },
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadCrumbs,
          }),
        }
      ],
    });
  };

  async function getUserPageData () {
    let url = "info";
  
    switch (route.path) {
      case "/user":
      case "/user/info":
        url = "userInfo";
        break;
      case "/user/login":
        url = "userLogin";
        break;
      case "/user/address":
        url = "userAddress";
        break;
      case "/user/orders":
        url = "userOrders";
        break;
  
      default:
        break;
    }
    const { data: page }: any = await useAsyncData(() => {
      return pageStore.getData({
        url: "user",
        query: "",
        lang: "fa",
        dataResult: "",
      });
    });
  
    const title = t(`pages.seo.${url}.title`);
  
    useHead({
      title,
    });
  };


  async function getProductListPage (originatedFrom: 'product_brand' | 'product_category' | 'selection_special_offer' | 'search') {
    if (!route.params.productCategoryId) return;
  
    const {
      public: { domain },
    } = useRuntimeConfig();
  
    const { data }: any = await useAsyncData(() => {
      const query = {
        ...route.query,
      } as any;



      let url = "/public/product/product"

      if (originatedFrom !== "product_category") {
        query.fetchAdditionalData = "1"
        url = "/public/product/all-product"
      }


      switch (originatedFrom) {
        case "product_category":
          query.inheritedFrom = route.params.productCategoryId
          break;
        case "product_brand":
          query.product_brand_slug = route.params.productCategoryId
          break;
        case "search":
          query.name = route.params.productCategoryId
          break;
        case "selection_special_offer":
          query.product_is_special_offer = "1"
          break;
      
        default:
          break;
      }
  

    
      return productStore.getMultiData({
        lang: locale.value,
        dataResult: "result",
        dataCountResult: "totalCount",
        preDefined: {
          published: "1",
        },
        url,
        pageNumber: route.query.pageNumber ? Number(route.query.pageNumber) : 1,
        pageSize: 20,
        query,
      });
    });


    
    let iconField = data.value?.origin?.icon_url ? 
    img(getUrl(data.value.origin.icon_url), imageOptions) : 
    img("/images/logo.png" , imageOptions)
    let titleField = '' 
    let descriptionField = ''

    const breadCrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("pages.seo.home.name"),
        item: domain,
      }
    ]


    switch (originatedFrom) {
      case "product_category":
        titleField = data.value?.origin?.seo_title
        descriptionField = data.value?.origin?.seo_description
        const reversedLinks = [...data.value?.origin?.inheritance].reverse();

        for (let i = 0; i < reversedLinks.length; i++) {
          const {slug, seo_title} = reversedLinks[i];
          
          breadCrumbs.push({
            "@type": "ListItem",
            position: i + 2,
            name: seo_title,
            item: `${domain}/category/${slug}`,
          })
        }
        break;
      case "product_brand":

      
        titleField = data.value?.origin?.seo_title ? data.value.origin.seo_title : t("pages.seo.productBrands.title", {
          brand: data.value?.origin?.name,
        })
        descriptionField = data.value?.origin?.seo_description? data.value.origin.seo_description : data.value?.origin?.description
        breadCrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: titleField,
          item: `${domain}${route.path?.replace(/\/$/, "")}`,
        })
        break;
      case "search":
        titleField = t("pages.productSearchResult.title", {
          searchQuery: route.params.productCategoryId 
        })
        breadCrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: titleField,
          item: `${domain}${route.path?.replace(/\/$/, "")}`,
        })
        descriptionField = t("pages.productSearchResult.description")
        break;
      case "selection_special_offer":
        titleField = t("pages.specialOfferProduct.title")
        breadCrumbs.push({
          "@type": "ListItem",
          position: 2,
          name: titleField,
          item: `${domain}${route.path?.replace(/\/$/, "")}`,
        })
        descriptionField = t("pages.specialOfferProduct.description")
        break;
    
      default:
        break;
    }
    
  
    useHead({
      title: titleField,
      meta: [
        {
          name: "description",
          content: descriptionField,
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: titleField,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: descriptionField,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: iconField,
        },
        {
          hid: "t-type",
          property: "twitter:cart",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: titleField,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: descriptionField,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: iconField,
        },
        {
          hid: "canonical",
          name: "canonical",
          content: `${domain}${route.path?.replace(/\/$/, "")}`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: tagSanitizer(data.value?.origin?.tags),
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebPage",
            name: titleField,
            description: titleField,
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadCrumbs,
          }),
        }
      ],
    });
  };


  async function getSingleProductPage () {
    if (!route.params.productId) return;
  
    const { data }: any = await useAsyncData(
      () => {
        return productStore.getData({
          url: `/public/product/product/${route.params.productId}`,
          query: "",
          lang: "fa",
          dataResult: "",
        });
      }
    );
  
    const {
      public: { domain },
    } = useRuntimeConfig();
  
    // const page = data;
    
    const reversedLinks = data.value.inheritance?.slice(1).reverse()
    const title = data.value.seo_title;
    const breadCrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: t("pages.seo.home.name"),
        item: domain,
      }
    ]

    for (let i = 0; i < reversedLinks.length; i++) {
      const {slug, seo_title} = reversedLinks[i];
      
      breadCrumbs.push({
        "@type": "ListItem",
        position: i + 2,
        name: seo_title,
        item: `${domain}/category/${slug}`,
      })

      if (i + 1 == reversedLinks.length) {
        breadCrumbs.push({
          "@type": "ListItem",
          position: i + 3,
          name: data.value.seo_title,
          item: `${domain}/product/${data.value.slug}`,
        })
      }
    }


    const description = data.value.seo_description;
    const image_url =
      data.value && data.value.images && data.value.images[0]
        ? img(getUrl(data.value.images[0].image_url), imageOptions)
        : img("/images/logo.png", imageOptions);
        
    const { title: siteName } = locales.value.filter((l: any) => {
      return l.code == locale.value;
    })[0] as any;
  
    const keywords = tagSanitizer(data.value?.tags)


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
    tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
    const priceValidUntil = new Date(tomorrow.toLocaleString("en-US", {timeZone: "Asia/Tehran"}));

    function getOffers(){
      const offers = []
      for (let i = 0; i < data.value.models.length; i++) {
        const model = data.value.models[i];
        const offer = {
          "@type": "Offer",
          "price": model.discounted_price,
          "priceCurrency": "IRR",
          "availability": "http://schema.org/InStock",
          "priceValidUntil": priceValidUntil,
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "IRR"
            },
            "shippingDestination": {
              "@type": "Country",
              "name": "Iran"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "businessDays": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["http://schema.org/Saturday", "http://schema.org.Friday"]
              },
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 2,
                "unitText": "days"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 7,
                "unitText": "days"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IR",
            "returnPolicyCategory": "http://schema.org/ReturnShippingFees",
            "returnMethod": "http://schema.org/ReturnByMail",
            "returnFees": "http://schema.org/SellerPays"
          },
          "seller": {
            "@type": "Organization",
            "name": siteName
          },
          "itemCondition": "http://schema.org/NewCondition",
        } as any
        if (data.value.show_models_as_radio) {
          offer["color"] = `#${model.slug}`
        }
        offers.push(offer)
      }
      return offers
    }

    
    useHead({
      title: `${title}`,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          hid: "og-type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og-title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: description,
        },
        {
          hid: "og-image",
          property: "og:image",
          content: image_url,
        },
        {
          hid: "t-type",
          property: "twitter:cart",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image_url,
        },
        {
          hid: "canonical",
          name: "canonical",
          content: `${domain}${route.path?.replace(/\/$/, "")}`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: keywords,
        },
      ],
      // todo do the scripts
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.value.name,
            description,
            url: `${domain}${route.path?.replace(/\/$/, "")}`,
            brand: {
              "@type": "Brand",
              name: data.value.brand.name,
              logo: img(getUrl(data.value.brand.icon_url), {
                width: 200, 
                height: 200, 
              }),
            },
            offers: getOffers(),
            publisher: {
              "@type": "Organization",
              name: siteName,
              logo: img("/images/logo.png", {width: 200, height: 200}),
              url: domain,
              description: t("pages.seo.website.description"),
              contactPoint: {
                "@type": "ContactPoint",
                telephone: info.value.contact_number,
                contactType: t("pages.seo.contactType.name"),
              },
              sameAs: [info.value.instagram],
            },
            datePublished: data.value.created_at,
            keywords,
            image: {
              "@type": "ImageObject",
              url: image_url,
              // todo add size
              width: 180,
              height: 180,
            },
          }),
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadCrumbs,
          }),
        }
      ],
    });
  };
    
  

  return {
    getCartPageData,
    getBlogsPageData,
    getDefaultPageData,
    getUserPageData,
    getSingleBlogPageData,
    getProductListPage,
    getSingleProductPage
  }
}